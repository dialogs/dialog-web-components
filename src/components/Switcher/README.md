Basic Switcher:

```jsx
initialState = { value: true };

<Switcher
  id="example"
  name="example"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Switcher with label:

```jsx
initialState = { value: true };

<Switcher
  id="label"
  name="label"
  value={state.value}
  onChange={(value) => setState({ value })}
>
  Some label
</Switcher>
```

Disabled Switcher:

```jsx
initialState = { value: true };

<Switcher
  disabled
  id="disabled"
  name="disabled"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Danger Switcher:

```jsx
initialState = { value: true };

<Switcher
  danger
  id="danger"
  name="danger"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```
