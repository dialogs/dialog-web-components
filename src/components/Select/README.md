Basic Select:

```
const options = [
  {
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }
];

initialState = {
  value: 'user',
  options: options
};

const handleChange = (value) => {
  setState({ value });
};

<div style={{height: 400}}>
  <Select
    onChange={handleChange}
    value={state.value}
    options={state.options}
  />
</div>
```
