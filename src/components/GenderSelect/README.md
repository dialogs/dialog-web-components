GenderSelect:

```
initialState = { value: 'unknown' };

const handleChange = (value) => {
  setState({ value });
};

<GenderSelect
  value={state.value}
  onChange={handleChange}
/>
```
