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
    }
  ],
  updateWebpackConfig(config) {
    const source = path.join(__dirname, 'src');

    config.entry.push(
      path.join(source, 'styles/styleguide.css')
    );

    config.module.loaders.push({
      test: /\.js$/,
      include: source,
      loaders: [
        'babel?cacheDirectory',
        'eslint'
      ]
    }, {
      test: /\.css$/,
      include: source,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]&importLoaders=1',
        'postcss'
      ]
    });

    Object.assign(config, {
      postcss(webpack) {
        return [
          require('stylelint')(),
          require('postcss-import')({
            addDependencyTo: webpack
          }),
          require('postcss-autoreset')(),
          require('postcss-initial')(),
          require('postcss-cssnext')(),
          require('postcss-nested')(),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')({
            clearMessages: true
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
