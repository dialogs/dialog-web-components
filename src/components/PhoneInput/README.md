```
initialState = {
  country: {
    alpha2: 'RU',
    code: '+7'
  },
  value: '',
  status: 'normal'
};

handleChange = (value) => {
  setState({ value });
};

handleCountryChange = (country) => {
  setState({
    country,
    value: country.code
  });
};

<PhoneInput
  country={state.country}
  value={state.value}
  onChange={handleChange}
  onCountryChange={handleCountryChange}
/>
```
