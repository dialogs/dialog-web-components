/* eslint global-require:0 */
const path = require('path');
const pkg = require('./package.json');
const components = require('./components.json');

function doc(name) {
  return path.resolve(__dirname, 'docs', name + '.md');
}

function component(name) {
  return path.resolve(__dirname, 'src/components', name);
}

module.exports = {
  title: `Dialog Components v${pkg.version}`,
  serverPort: 5000,
  highlightTheme: 'dracula',
  sections: components.map(({ name, content, components }) => {
    return {
      name,
      content: content ? doc(content) : content,
      components() {
        return components.map((name) => component(name))
      }
    };
  }),
  updateWebpackConfig(config) {
    const source = path.join(__dirname, 'src');
    const whitelist = [
      source,
      path.join(__dirname, 'node_modules/@dlghq/markdown'),
      path.join(__dirname, 'node_modules/@dlghq/react-l10n'),
      path.join(__dirname, 'node_modules/@dlghq/dialog-types')
    ];

    config.entry.push(
      path.join(source, 'styles/styleguide.css')
    );

    config.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'src/styleguide/Wrapper');

    config.module.loaders.push({
      test: /\.js$/,
      include: whitelist,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.css$/,
      include: whitelist,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]&importLoaders=1',
        'postcss'
      ]
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
    return path.join(componentPath, 'README.md');
  }
};
