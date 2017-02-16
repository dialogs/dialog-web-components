Basic Input:

```
<Input
  id="input_basic"
  label="Basic"
  placeholder="Basic placeholder"
  value={state.value || ''}
  onChange={(value) => setState({ value })}
/>
```

Input without label:

```
<Input
  id="input_no_label"
  value={state.value || ''}
  onChange={(value) => setState({ value })}
/>
```

Disabled Input:

```
<Input
  disabled
  id="input_disabled"
  label="Disabled"
  value="Disabled input text"
/>
```

Success Input with hint:

```
<Input
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
<Input
  hint="Incorrect email"
  id="input_error_hint"
  label="Email"
  onChange={(value) => setState({ value })}
  status="error"
  value={state.value || 'bob@example.com'}
/>
```

Prefixed Input

```
<Input
  id="shortname"
  label="Channel link"
  onChange={(value) => setState({ value })}
  placeholder="string"
  prefix="app.dlg.im/"
  value={state.value || ''}
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
  value={state.value || ''}
  onChange={(value) => setState({ value })}
/>
```

You can make `Input` even larger. Just add `large` to props:

```
<Input
  id="title"
  label="Group name"
  value=""
  placeholder="Name your group"
  large
  value={state.value || ''}
  onChange={(value) => setState({ value })}
/>
```
