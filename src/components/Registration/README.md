```jsx
initialState = {
  info: {
    name: '',
    gender: 'unknown'
  },
  isGenderEnabled: true
};

const handleChange = (value) => {
  console.debug(value);
  setState({ info: value });
};
const handleSubmit = (value) => {
  console.debug('Submit registration with: ', value);
};

<div style={{ margin: 'auto', width: 400 }}>
  <Registration
    info={state.info}
    autoFocus={false}
    isGenderEnabled={state.isGenderEnabled}
    onChange={handleChange}
    onSubmit={handleSubmit}
  />
</div>
```
