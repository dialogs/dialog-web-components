Basic Radio:

```jsx
const RadioGroup = require('./RadioGroup').default;

initialState = { value: 'group' };
const handleChange = (value) => setState({ value });

<div>
  <h3>Current value: {state.value}</h3>
  <hr />
  <RadioGroup value={state.value} onChange={handleChange}>
    <Radio value="group" />
    <Radio value="channel" />
  </RadioGroup>
</div>;
```

You can render labeled content as children of Radio component:

```jsx
const RadioGroup = require('./RadioGroup').default;

initialState = { value: 'group' };
const handleChange = (value) => setState({ value });

<RadioGroup value={state.value} onChange={handleChange}>
  <Radio value="group">Group</Radio>
  <br />
  <Radio value="channel">Channel</Radio>
</RadioGroup>;
```

Also you can disable radio group by adding `disabled` attribute:

```jsx
const RadioGroup = require('./RadioGroup').default;

initialState = { value: 'group' };
const handleChange = (value) => setState({ value });

<RadioGroup value={state.value} onChange={handleChange} disabled>
  <Radio value="group">Group</Radio>
  <br />
  <Radio value="channel">Channel</Radio>
</RadioGroup>;
```
