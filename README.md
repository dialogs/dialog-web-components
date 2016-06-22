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

Development
-----------

NPM scripts:

 - `npm start` start dev server
 - `npm run build` build
 - `npm run gh-pages` publish to gh-pages

License
-------
[Apache-2.0](LICENSE)
