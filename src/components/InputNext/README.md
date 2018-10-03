Basic Input:

```jsx
const initialState = {
  value: ''
};

<InputNext
  id="input_next_basic"
  label="Basic"
  placeholder="Basic placeholder"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Input without label:

```jsx
const initialState = {
  value: ''
};

<InputNext
  id="input_next_no_label"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Disabled Input:

```jsx
<InputNext
  disabled
  id="input_next_disabled"
  label="Disabled"
  value="Disabled input text"
/>
```

Success Input with hint:

```jsx
<InputNext
  hint="Correct email"
  id="input_next_success_hint"
  label="Email"
  onChange={(value) => setState({ value })}
  status="success"
  value={state.value || 'bob@example.com'}
/>
```

Error Input with hint:

```jsx
<InputNext
  hint="Incorrect email"
  id="input_next_error_hint"
  label="Email"
  onChange={(value) => setState({ value })}
  status="error"
  value={state.value || 'bob@example.com'}
/>
```

Prefixed Input

```jsx
<InputNext
  id="shortname2"
  label="Channel link"
  onChange={value => setState({ value })}
  placeholder="string"
  prefix="app.dlg.im/"
  value={state.value || ''}
/>
```

Since `<textarea />` has the same interface as `<input />`, there is `textarea` type:

```jsx
const initialState = {
  value: ''
};

<InputNext
  id="input_next_textarea"
  type="textarea"
  label="About"
  placeholder="Type something"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Input with maxLength

```jsx
const initialState = {
  value: ''
};

<InputNext
  id="input_next_maxLenght"
  type="textarea"
  label="About"
  maxLength={10}
  placeholder="Type something"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```
