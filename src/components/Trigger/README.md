You should note that every trigger props works like a **flags**.
You shouldn't update them. Imagine if `shouldComponentUpdate` always
returns `false` inside of this component.

Example:

```jsx
initialState = {
  openHandler: ['onClick'],
  closeHandler: ['onClick'],
  closeOnDocumentClick: true,
  closeOnDocumentScroll: true,
  closeOnChildClick: false,
  options: {
    attachment: 'middle left',
    targetAttachment: 'middle right',
    constraints: [{ to: 'scrollParent', attachment: 'together' }],
  },
};
const renderTrigger = (newProps) => {
  return (
    <Button theme="primary" {...newProps}>
      Click me!
    </Button>
  );
};
const renderChild = () => {
  return (
    <div
      style={{
        padding: 10,
        margin: 5,
        borderRadius: 4,
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,.1)',
      }}
    >
      <Icon glyph="logo" size={30} onClick={() => alert('!')} />
    </div>
  );
};

<Trigger
  openHandler={state.openHandler}
  closeHandler={state.closeHandler}
  closeOnDocumentClick={state.closeOnDocumentClick}
  closeOnDocumentScroll={state.closeOnDocumentScroll}
  closeOnChildClick={state.closeOnChildClick}
  options={state.options}
  renderChild={renderChild}
  renderTrigger={renderTrigger}
/>;
```
