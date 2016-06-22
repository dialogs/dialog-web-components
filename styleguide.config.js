const path = require('path');
const pkg = require('./package.json');

module.exports = {
  title: `Dialog Components v${pkg.version}`,
  components: './src/*',
  updateWebpackConfig(config) {
    const source = path.join(__dirname, 'src');

    config.module.loaders.push(
      {
        test: /\.js$/,
        include: source,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.css$/,
        include: source,
        loader: 'style!css?modules&localIdentName=[name]__[local]&importLoaders=1!postcss'
      }
    );

    Object.assign(config, {
      postcss(webpack) {
        return [
          require('postcss-import')({ addDependencyTo: webpack }),
          require('postcss-cssnext')(),
          require('postcss-nested')(),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')()
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
