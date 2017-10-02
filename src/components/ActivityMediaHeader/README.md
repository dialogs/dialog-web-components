```jsx

initialState = {
  current: 'all'
};
const types = ['all', 'photo', 'documents'];
const handleChange = (type) => setState({ current: type });

<div style={{ background: '#fff', width: 320 }}>
  <ActivityMediaHeader
    types={types}
    current={state.current}
    onChange={handleChange}
    onClose={() => {}}
    onBack={() => {}}
  />
</div>
```
