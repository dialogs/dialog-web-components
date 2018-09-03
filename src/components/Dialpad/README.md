```jsx

initialState = {
  number: '+71234567890'
};

const handleChange = (number) => {
  setState({ number });
};

const handleSubmit = (number) => {
  console.log(number);
};

<Dialpad
  number={state.number}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>
```
