const path = require('path');
const pkg = require('./package.json');

module.exports = {
  title: `Dialog Components v${pkg.version}`,
  components: './src/components/*',
  highlightTheme: 'dracula',
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
