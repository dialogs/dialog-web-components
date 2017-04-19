/* eslint global-require:0, no-sync:0 */
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const schema = require('./components.json');

function resolve(...paths) {
  return fs.realpathSync(path.join(__dirname, ...paths));
}

module.exports = {
  title: `dialog components v${pkg.version}`,
  serverPort: 5000,
  highlightTheme: 'dracula',
  sections: schema.map(({ name, content, components }) => {
    return {
      name,
      content: content ? resolve('docs', content + '.md') : null,
      components() {
        return components.map((componentName) => {
          return resolve('src/components', componentName, componentName + '.js');
        });
      }
    };
  }),
  updateWebpackConfig(config) {
    const whitelist = [
      resolve('src'),
      resolve('node_modules/@dlghq/markdown'),
      resolve('node_modules/@dlghq/react-l10n'),
      resolve('node_modules/@dlghq/dialog-types'),
      resolve('node_modules/@dlghq/dialog-utils'),
      resolve('node_modules/@dlghq/country-codes')
    ];

    config.entry.push(
      resolve('src/styles/styleguide.css')
    );

    config.entry.push(
      resolve('src/styles/global.css')
    );

    config.resolve.alias['rsg-components/Wrapper'] = resolve('src/styleguide/Wrapper.js');

    config.module.loaders.push({
      test: /\.js$/,
      include: whitelist,
      loader: 'babel',
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
      use: ['svg-sprite-loader']
    }, {
      test: /\.txt$/,
      include: whitelist,
      use: ['raw-loader']
    });

    return config;
  },

  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    return `import { ${name} } from '${pkg.name}';`;
  },

  getExampleFilename(componentPath) {
    return componentPath.replace(/[\w\d]+\.js$/i, 'README.md');
  }
};
