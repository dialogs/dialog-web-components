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

  webpackConfig: require('./webpack.config'),

  dangerouslyUpdateWebpackConfig(config) {
    config.entry.push(resolve('src/styles/global.css'));
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
