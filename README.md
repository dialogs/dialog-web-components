dialog web components
=====================

[![CircleCI](https://img.shields.io/circleci/project/github/dialogs/dialog-web-components/master.svg)](https://circleci.com/gh/dialogs/dialog-web-components/tree/master)

[![dependencies](https://img.shields.io/david/dialogs/dialog-web-components.svg)](package.json)
[![devDependencies](https://img.shields.io/david/dev/dialogs/dialog-web-components.svg)](package.json)

[![GitHub tag](https://img.shields.io/github/tag/dialogs/dialog-web-components.svg)](https://github.com/dialogs/dialog-web-components/tags)
[![npm version](https://img.shields.io/npm/v/@dlghq/dialog-components.svg)](https://www.npmjs.com/package/@dlghq/dialog-components)

[![license](https://img.shields.io/github/license/dialogs/dialog-web-components.svg)](LICENSE)


[Docs & Demo](https://dialogs.github.io/dialog-web-components/)


Installation
------------

```
yarn add @dlghq/dialog-components
```
or
```
npm install --save @dlghq/dialog-components
```

Usage example
-------------

```js
import React from 'react';
import { render } from 'react-dom';
import { Avatar } from '@dlghq/dialog-components';

const container = document.getElementById('container');

render(
  <Avatar
    title="Hipster Partycat"
    image="https://octodex.github.com/images/hipster-partycat.jpg"
  />,
  container
);
```

[More components.](https://dialogs.github.io/dialog-web-components/)

Webpack configuration
---------------------

We're not compiling JS & CSS code before publishing.
You have to update or add webpack configuration to your build pipeline.

```
yarn add babel-loader postcss-loader css-loader style-loader svg-sprite-loader
yarn add @dlghq/babel-preset-dialog @dlghq/postcss-dialog
```

```javascript
// webpack.config.js

const fs = require('fs');
const path = require('path');

function resolve(...paths) {
  return fs.realpathSync(path.join(__dirname, ...paths));
}

const whitelist = [
  resolve('src'), // your application code
  resolve('node_modules/@dlghq/dialog-components/src'),
  resolve('node_modules/@dlghq/markdown'),
  resolve('node_modules/@dlghq/react-l10n'),
  resolve('node_modules/@dlghq/dialog-types'),
  resolve('node_modules/@dlghq/dialog-utils'),
  resolve('node_modules/@dlghq/country-codes')
];

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: whitelist,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: true,
          presets: [
            [
              '@dlghq/dialog',
              {
                modules: false,
                runtime: false
              }
            ]
          ]
        }
      },
      {
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
                return require('@dlghq/postcss-dialog')();
              }
            }
          }
        ],
        include: [
          resolve('node_modules/@dlghq/dialog-components/src/styles/global.css')
        ]
      },
      {
        test: /\.css$/,
        include: whitelist,
        exclude: [
          resolve('node_modules/@dlghq/dialog-components/src/styles/global.css')
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
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        exclude: resolve('node_modules/@dlghq/dialog-components/src/components/Icon/svg'),
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        include: resolve('node_modules/@dlghq/dialog-components/src/components/Icon/svg'),
        loader: 'svg-sprite-loader'
      }
    ]
  }
};
```

Translations
------------

For some complex components, like `AuthForm` you should wrap your components tree
by `@dlghq/react-l10n` `Provider` component.
Before publishing we generate `messages.json` bundle, which you should pass to `Provider`.

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from '@dlghq/react-l10n';
import dialogMessages from '@dlghq/dialog-components/src/messages.json';
import appMessages from './messages';

const container = document.getElementById('container');

const messages = { ...dialogMessages, ...appMessages };

render(
  <Provider messages={messages} locale={navigator.language}>
    <App />
  </Provider>,
  container
);
```

Development
-----------

NPM scripts:

 - `npm start` start dev server
 - `npm run create` create new component
 - `npm test` run tests
 - `npm run lint` run linters
 - `npm run format` run formatters
 - `npm run build` build library
 - `npm run docs` build docs
 - `npm run release` build & publish to npm & publish to gh-pages

License
-------
[Apache-2.0](LICENSE)
