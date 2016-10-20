Basic Trigger:

```
const Button = require('../Button/Button').default;
initialState = {
  openHandler: ['onMouseEnter'],
  closeHandler: ['onMouseLeave'],
  closeOnDocumentClick: false,
  closeOnDocumentScroll: false,
  options: {
    attachment: 'middle left',
    targetAttachment: 'middle right',
    constraints: [{ to: 'scrollParent', attachment: 'together' }],
    offset: '0px 0px'
  }
};
const actions = {
  renderChild: () => {
    return <Icon glyph="close" />;
  }
};

<Trigger {...state} {...actions} >
  <Button>Click me!</Button>
</Trigger>
```
