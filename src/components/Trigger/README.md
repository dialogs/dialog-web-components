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
const renderTrigger = (newProps) => {
  return (
    <Button theme="primary" {...newProps}>Click me!</Button>
  );
};
const renderChild = () => {
  return <Icon glyph="close" />;
};

<Trigger
  openHandler={state.openHandler}
  closeHandler={state.closeHandler}
  closeOnDocumentClick={state.closeOnDocumentClick}
  closeOnDocumentScroll={state.closeOnDocumentScroll}
  options={state.options}
  renderChild={renderChild}
  renderTrigger={renderTrigger}
/>
```
