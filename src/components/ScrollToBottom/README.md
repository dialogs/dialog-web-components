```
initialState = {
  counter: 0
};
const handleClick = () => {
  setState({ counter: ++state.counter });
  console.log(state);
};

<ScrollToBottom onClick={handleClick} counter={state.counter} />
```
