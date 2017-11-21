```jsx
initialState = {
  isOpen: false,
  type: "notifications"
};

<div>
  <div className="styleguide__buttons">
    <Button size="small" theme="info" onClick={() => setState({ type: 'notifications', isOpen: true })}>notifications</Button>
    <Button size="small" theme="success" onClick={() => setState({ type: 'camera', isOpen: true })}>camera</Button>
    <Button size="small" theme="warning" onClick={() => setState({ type: 'mic', isOpen: true })}>mic</Button>
  </div>
  {state.isOpen ? (
    <PermissionBanner
      type={state.type}
      onClose={() => setState({ isOpen: false })}
      onPermissionRequest={() => console.log('Request permissions')}
    />
  ) : null}
</div>
```
