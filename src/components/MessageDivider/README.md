Basic MessageDivider:

```jsx
initialState = {
  isVisible: true
};

<div>
  <Button theme="primary" onClick={() => setState({ isVisible: !state.isVisible })} size="small">
    Toggle
  </Button>
  <br />
  <br />
  <MessageDivider visible={state.isVisible} theme="primary">Today</MessageDivider>
</div>
```

Themable MessageDivider:

```jsx
<div>
  <MessageDivider>Default</MessageDivider>
  <MessageDivider theme="primary">Primary</MessageDivider>
  <MessageDivider theme="success">Success</MessageDivider>
  <MessageDivider theme="danger">Danger</MessageDivider>
  <MessageDivider theme="info">Info</MessageDivider>
  <MessageDivider theme="warning">Warning</MessageDivider>
</div>
```
