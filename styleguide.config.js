/* eslint global-require:0 */
const path = require('path');
const pkg = require('./package.json');

function doc(name) {
  return path.resolve(__dirname, 'docs', name + '.md');
}

function component(name) {
  return path.resolve(__dirname, 'src/components', name);
}

module.exports = {
  title: `Dialog Components v${pkg.version}`,
  highlightTheme: 'dracula',
  sections: [{
    name: 'Interface',
    components() {
      return [
        component('Avatar'),
        component('UserAvatar'),
        component('Button'),
        component('Modal'),
        component('Spinner'),
        component('Scroller'),
        component('Dropdown')
      ];
    }
  }, {
    name: 'Sidebar',
    components() {
      return [
        component('RecentItem')
      ];
    }
  }, {
    name: 'Forms',
    content: doc('forms'),
    components() {
      return [
        component('Input'),
        component('Checkbox'),
        component('Switcher'),
        component('Fieldset')
      ];
    }
  }, {
    name: 'Plug & Play Forms',
    components() {
      return [
        component('AuthForm')
      ];
    }
  }, {
    name: 'Chat',
    components() {
      return [
        component('Message'),
        component('MessageContent'),
        component('MessageGroup'),
        component('MessageList')
      ];
    }
  }],
  updateWebpackConfig(config) {
    const source = path.join(__dirname, 'src');
    const whitelist = [
      source,
      path.join(__dirname, 'node_modules/@dlghq/react-l10n')
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
      test: /\.json/,
      include: whitelist,
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
