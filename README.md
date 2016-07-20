Dialog Web Components
=====================

[Docs](https://dialogs.github.io/dialog-web-components/)


Installation
------------

```
npm install --save @dlghq/dialog-components
```

Usage
----

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
 - `npm run build` build docs & library
 - `npm run release` build & publish to npm & publish to gh-pages

License
-------
[Apache-2.0](LICENSE)
