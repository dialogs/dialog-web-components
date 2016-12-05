/* eslint global-require:0 */
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const components = require('./components.json');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf-8'));

function resolve(...paths) {
  return fs.realpathSync(path.join(__dirname, ...paths));
}

module.exports = {
  title: `Dialog Components v${pkg.version}`,
  serverPort: 5000,
  highlightTheme: 'dracula',
  sections: components.map(({ name, content, components }) => {
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
      resolve('node_modules/@dlghq/dialog-utils')
    ];

    config.entry.push(
      resolve('src/styles/styleguide.css')
    );

    config.resolve.alias['rsg-components/Wrapper'] = resolve('src/styleguide/Wrapper.js');

    config.module.loaders.push({
      test: /\.js$/,
      include: whitelist,
      loader: 'babel',
      query: Object.assign({}, babelrc, {
        babelrc: false,
        cacheDirectory: true
      })
    }, {
      test: /\.css$/,
      include: whitelist,
      exclude: resolve('src/styles/global.css'),
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]&importLoaders=1',
        'postcss'
      ]
    }, {
      test: /\.css$/,
      include: resolve('src/styles/global.css'),
      loaders: ['style', 'css', 'postcss']
    }, {
      test: /\.json$/,
      include: [
        ...whitelist,
        path.join(__dirname, 'node_modules/entities')
      ],
      loader: 'json'
    }, {
      test: /\.yml$/,
      include: whitelist,
      loader: 'yml'
    }, {
      test: /\.(jpg|png|svg|gif)$/,
      include: /./,
      loader: 'file'
    }, {
      test: /\.txt$/,
      include: whitelist,
      loader: 'raw'
    });

    Object.assign(config, {
      postcss(webpack) {
        return [
          require('@dlghq/postcss-dialog')({
            bundler: webpack
          })
        ];
      }
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
