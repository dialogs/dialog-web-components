Basic ConnectionStatus:

```
const initialState = {
  status: null
};
const setDefault = () => setState(initialState);
const setOnline = () => setState({ status: 'online' });
const setConnecting = () => setState({ status: 'connecting' });
const setUpdating = () => setState({ status: 'updating' });

<div>
  <button onClick={setDefault}>Default</button>
  <button onClick={setOnline}>Online</button>
  <button onClick={setConnecting}>Connecting</button>
  <button onClick={setUpdating}>Updating</button>
  <ConnectionStatus status={state.status} />
</div>
```
