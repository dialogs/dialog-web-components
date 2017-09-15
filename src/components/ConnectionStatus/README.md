```jsx
initialState = {
  status: 'online'
};

const handleOnline = () => setState({ status: 'online'});
const handleConnecting = () => setState({ status: 'connecting'});
const handleUpdaing = () => setState({ status: 'updating'});

<div>
  <div className="styleguide__buttons">
    <Button theme="primary" size="small" onClick={handleOnline}>Set online</Button>
    <Button theme="warning" size="small" onClick={handleConnecting}>Set connecting</Button>
    <Button theme="danger" size="small" onClick={handleUpdaing}>Set updating</Button>
  </div>

  <div style={{ height: 30, overflow: 'hidden' }}>
    <ConnectionStatus status={state.status} />
  </div>
</div>
```
