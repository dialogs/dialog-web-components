/* eslint global-require:0 */
const path = require('path');
const pkg = require('./package.json');

function component(name) {
  return path.resolve(__dirname, 'src/components', name);
}

module.exports = {
  title: `Dialog Components v${pkg.version}`,
  highlightTheme: 'dracula',
  sections: [
    {
      name: 'Interface',
      components() {
        return [
          component('Avatar'),
          component('UserAvatar'),
          component('Button'),
          component('Modal'),
          component('Spinner'),
          component('Scroller')
        ];
      }
    },
    {
      name: 'Forms',
      components() {
        return [
          component('Input'),
          component('Checkbox'),
          component('Switcher')
        ];
      }
    },
    {
      name: 'Plug & Play Forms',
      components() {
        return [
          component('LoginForm')
        ];
      }
    }
  ],
  updateWebpackConfig(config) {
    const source = path.join(__dirname, 'src');

    config.entry.push(
      path.join(source, 'styles/styleguide.css')
    );

    config.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'src/styleguide/Wrapper');

    config.module.loaders.push({
      test: /\.js$/,
      include: source,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.css$/,
      include: source,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]&importLoaders=1',
        'postcss'
      ]
    }, {
      test: /\.json/,
      include: source,
      loader: 'json'
    }, {
      test: /\.yml$/,
      include: source,
      loader: 'json!yaml'
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
