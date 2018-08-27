```jsx

initialState = {
  phone: '+71234567890'
};

const handleChange = (phone) => {
  setState({ phone });
};

const handleSubmit = (phone) => {
  alert(phone);
};

<div>
  <Dialpad
    phone={state.phone}
    onChange={handleChange}
    onSubmit={handleSubmit}
  />
</div>
```
