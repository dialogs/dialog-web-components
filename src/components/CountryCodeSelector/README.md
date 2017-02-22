```
handleChange = (value) => {
  setState({ value });
  console.debug(value);
};

<div style={{height: 300}}>
  <CountryCodeSelector
    label={'Country and code'}
    value={state.value}
    onChange={handleChange}
  />
</div>
```
