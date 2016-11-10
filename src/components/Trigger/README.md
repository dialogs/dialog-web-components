Basic Trigger:

```
const Button = require('../Button/Button').default;
initialState = {
  openHandler: ['onClick'],
  closeHandler: ['onClick'],
  closeOnDocumentClick: false,
  closeOnDocumentScroll: false,
  options: {
    attachment: 'middle left',
    targetAttachment: 'middle right',
    constraints: [{ to: 'scrollParent', attachment: 'together' }]
  }
};
const actions = {
  renderChild: () => {
    return <Icon glyph="close" />;
  }
};

<Trigger {...state} {...actions} >
  <Button theme="primary">Click me!</Button>
</Trigger>
```
