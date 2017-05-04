```
handleChange = (value) => {
  setState({ value });
  console.debug(value);
};

<CountryCodeSelector
  label={'Country and code'}
  value={state.value}
  onChange={handleChange}
/>
```
