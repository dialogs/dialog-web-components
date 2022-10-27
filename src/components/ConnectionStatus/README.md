Basic ConnectionStatus:

```
const statuses = ['online', 'connecting', 'updating'];
const initialState = {
  id: null,
  status: 'online'
};

const start = () => {
  clearInterval(state.id);

  const id = setInterval(() => {
    const idx = parseInt(Math.random() * 1000, 10) % statuses.length;
    setState({
      status: statuses[idx]
    });
  }, 10000);

  setState({ id });
};

const stop = () => {
  clearInterval(state.id);
  setState({ id: null });
};

<div>
  <div style={{ margin: 8, textAlign: 'center' }}>
    <Button theme="success" size="small" onClick={start}>Start</Button>
    <Button theme="danger" size="small" onClick={stop}>Stop</Button>
  </div>

  <div style={{ height: 30, overflow: 'hidden' }}>
    <ConnectionStatus status={state.status} />
  </div>
</div>
```
