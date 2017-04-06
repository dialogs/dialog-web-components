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
