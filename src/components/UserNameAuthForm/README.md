Example:

```
initialState = {
  value: { login: '', password: '' },
  error: null,
  pending: false
};

const handleChange = (value) => {
  setState({ value });
};

const handleSubmit = (value) => {
  setState({ pending: true });

  setTimeout(() => {
    setState({ pending: false });
    if (Math.random() > 0.5) {
      setState({
        error: {
          tag: "WRONG_CREDENTIALS",
          message: "Wrong credentials",
          canTryAgain: false
        }
      });
    }
  }, 500);
};

<div style={{ margin: 'auto', width: 400, height: 400 }}>
  <UserNameAuthForm
    value={state.value}
    error={state.error}
    pending={state.pending}
    onChange={handleChange}
    onSubmit={handleSubmit}
  />
</div>
```
