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
  serverPort: 5000,
  highlightTheme: 'dracula',
  sections: [{
    name: 'Interface',
    components() {
      return [
        component('Avatar'),
        component('PeerAvatar'),
        component('Scroller'),
        component('Dropdown'),
        component('Icon'),
        component('Spinner'),
        component('Toolbar'),
        component('Logo')
      ];
    }
  }, {
    name: 'Buttons',
    components() {
      return [
        component('Button'),
        component('IconButton')
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
    name: 'Modals',
    components() {
      return [
        component('Modal')
      ];
    }
  }, {
    name: 'Plug & Play Modals',
    components() {
      return [
        component('JoinModal'),
        component('AddContactModal')
      ];
    }
  }, {
    name: 'Sidebar',
    components() {
      return [
        component('SidebarHeader'),
        component('SidebarSearch'),
        component('RecentItem'),
        component('RecentGroup'),
        component('FakeRecentItem')
      ];
    }
  }, {
    name: 'Chat',
    components() {
      return [
        component('Message'),
        component('MessageContent'),
        component('FakeMessage'),
        component('EmptyChat')
      ];
    }
  }, {
    name: 'Activity',
    components() {
      return [
        component('ActivityProfile'),
        component('ActivityList')
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
