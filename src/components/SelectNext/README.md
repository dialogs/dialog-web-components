Basic SelectNext:

```jsx
initialState = {
  value: null,
  options: [{
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }]
};

<SelectNext
  name="selectnext_default"
  id="selectnext_default"
  onChange={(value) => setState({ value })}
  value={state.value}
  placeholder="Basic SelectNext placehoder"
  options={state.options}
/>
```

Small Select:

```jsx
initialState = {
  value: 'user',
  options: [{
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }]
};

<SelectNext
  name="selectnext_default"
  id="selectnext_default"
  onChange={(value) => setState({ value })}
  value={state.value}
  placeholder="Small Select"
  options={state.options}
  size="small"
/>
```

Disabled SelectNext

```jsx
initialState = {
  value: 'user',
  options: [{
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }]
};

<SelectNext
  name="selectnext_disabled"
  id="selectnext_disabled"
  disabled
  onChange={(value) => setState({ value })}
  value={state.value}
  options={state.options}
/>
```

SelectNext with label

```jsx
const options = [{
  value: 'user', title: 'User'
}, {
  value: 'group', title: 'Group'
}];

<SelectNext
  id="selectnext_labeled"
  name="selectnext_labeled"
  label="Select peer type"
  onChange={(value) => setState({ value })}
  value={state.value}
  options={options}
/>
```

Themable SelectNext

```jsx
const options = [{
  value: 'default', title: 'Default theme'
}, {
  value: 'primary', title: 'Primary theme'
}, {
  value: 'success', title: 'Success theme'
}, {
  value: 'danger', title: 'Danger theme'
}, {
  value: 'info', title: 'Info theme'
}, {
  value: 'warning', title: 'Warning theme'
}];
const handleThemeChange = (theme) => setState({ value: theme });
initialState = {
  value: 'default'
};

<SelectNext
  id="selectnext_colored"
  name="selectnext_colored"
  label="Select theme"
  onChange={handleThemeChange}
  value={state.value}
  options={options}
  theme={state.value}
/>
```
