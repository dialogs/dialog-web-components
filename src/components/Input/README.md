Basic Input:

```
const initialState = { value: '' };
<Input
  id="input_basic"
  label="Basic"
  placeholder="Basic placeholder"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Input without label:

```
const initialState = { value: '' };
<Input
  id="input_no_label"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Disabled Input:

```
<Input
  id="input_disabled"
  label="Disabled"
  value=""
  disabled
/>
```

Success Input with hint:

```
<Input
  id="input_success_hint"
  label="Email"
  value="bob@example.com"
  hint="Correct email"
  status="success"
/>
```

Error Input with hint:

```
<Input
  id="input_error_hint"
  label="Email"
  value="bob at example.com"
  hint="Incorrect email"
  status="error"
/>
```

Prefixed Input

```
const onChange = (value) => setState({ value });
<Input
  id="shortname"
  label="Channel link"
  onChange={onChange}
  placeholder="string"
  prefix="app.dlg.im/"
  value={state.value}
/>
```

Since `<textarea />` has the same interface as `<input />`, there is `textarea` type:

```
const initialState = { value: '' };
<Input
  id="input_textarea"
  type="textarea"
  label="About"
  placeholder="Type something"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

You can make `Input` even larger. Just add `large` to props:

```
<Input
  id="about"
  label="About"
  type="textarea"
  value=""
  label="Description - optional"
  placeholder="Describe the Purpose of This Conversation"
  large
/>
```
