/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');

function resolve(...paths) {
  return fs.realpathSync(path.join(__dirname, ...paths));
}

const whitelist = [
  resolve('src'),
  resolve('node_modules/@dlghq/markdown'),
  resolve('node_modules/@dlghq/react-l10n'),
  resolve('node_modules/@dlghq/dialog-types'),
  resolve('node_modules/@dlghq/dialog-utils'),
  resolve('node_modules/@dlghq/country-codes')
];

module.exports = {
  entry: [
    resolve('src/styles/global.css')
  ],
  resolve: {
    alias: {
      'rsg-components/Wrapper': resolve('src/styleguide/Wrapper.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: whitelist,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: true,
          presets: [
            ['@dlghq/dialog', {
              modules: false,
              runtime: false,
              development: true
            }]
          ]
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return require('@dlghq/postcss-dialog')({ initial: false });
              }
            }
          }
        ],
        include: [
          resolve('src/styles/global.css')
        ]
      }, {
        test: /\.css$/,
        include: whitelist,
        exclude: [
          resolve('src/styles/global.css')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return require('@dlghq/postcss-dialog')();
              }
            }
          }
        ]
      }, {
        test: /\.json$/,
        include: [
          ...whitelist,
          path.join(__dirname, 'node_modules/entities')
        ],
        use: ['json-loader']
      }, {
        test: /\.yml$/,
        include: whitelist,
        use: ['yml-loader']
      }, {
        test: /\.(jpg|png|svg|gif)$/,
        include: /./,
        exclude: resolve('src/components/Icon/svg'),
        use: ['file-loader']
      }, {
        test: /\.(svg)$/,
        include: resolve('src/components/Icon/svg'),
        loader: 'svg-sprite-loader'
      }, {
        test: /\.txt$/,
        include: whitelist,
        use: ['raw-loader']
      }
    ]
  }
};
