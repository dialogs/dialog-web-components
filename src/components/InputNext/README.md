Basic Input:

```
const initialState = {
  value: ''
};

<InputNext
  id="input_basic"
  label="Basic"
  placeholder="Basic placeholder"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Input without label:

```
const initialState = {
  value: ''
};

<InputNext
  id="input_no_label"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Disabled Input:

```
<InputNext
  disabled
  id="input_disabled"
  label="Disabled"
  value="Disabled input text"
/>
```

Success Input with hint:

```
<InputNext
  hint="Correct email"
  id="input_success_hint"
  label="Email"
  onChange={(value) => setState({ value })}
  status="success"
  value={state.value || 'bob@example.com'}
/>
```

Error Input with hint:

```
<InputNext
  hint="Incorrect email"
  id="input_error_hint"
  label="Email"
  onChange={(value) => setState({ value })}
  status="error"
  value={state.value || 'bob@example.com'}
/>
```

Since `<textarea />` has the same interface as `<input />`, there is `textarea` type:

```
const initialState = {
  value: ''
};

<InputNext
  id="input_textarea"
  type="textarea"
  label="About"
  placeholder="Type something"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```
