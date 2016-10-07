Basic Switcher:

```
const initialState = { value: true };
<Switcher
  id="example"
  name="example"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```

Switcher with label:

```
const initialState = { value: true };
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

```
const initialState = { value: true };
<Switcher
  disabled
  id="disabled"
  name="disabled"
  value={state.value}
  onChange={(value) => setState({ value })}
/>
```
