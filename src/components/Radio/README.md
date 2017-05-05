Basic Radio:

```
const RadioGroup = require('./RadioGroup').default;

initialState = { value: 'group' };
const handleChange = (value) => setState({ value });

<div>
  <h3>Current value: {state.value}</h3>
  <hr />
  <RadioGroup name="radio_basic" value={state.value} onChange={handleChange}>
    <Radio value="group" />
    <Radio value="channel" />
  </RadioGroup>
</div>
```

You can render labeled content as children of Radio component:

```
const RadioGroup = require('./RadioGroup').default;

initialState = { value: 'group' };
const handleChange = (value) => setState({ value });

<RadioGroup name="radio_labeled" value={state.value} onChange={handleChange}>
  <Radio value="group">Group</Radio>
  <br />
  <Radio value="channel">Channel</Radio>
</RadioGroup>
```

Also you can disable radio group by adding `disabled` attribute:

```
const RadioGroup = require('./RadioGroup').default;

initialState = { value: 'group' };
const handleChange = (value) => setState({ value });

<RadioGroup name="radio_disabled" value={state.value} onChange={handleChange} disabled>
  <Radio value="group">Group</Radio>
  <br />
  <Radio value="channel">Channel</Radio>
</RadioGroup>
```
