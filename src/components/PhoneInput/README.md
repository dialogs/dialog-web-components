PhoneInput
----------

```
initialState = { value: '', country: null };

handleChange = (value, country) => {
  setState({ value, country });
};

<div>
  <PhoneInput 
    id="test_phone_input"
    value={state.value}
    onChange={handleChange}
  />
  <pre>{JSON.stringify(state, null, '  ')}</pre>
</div>
```
