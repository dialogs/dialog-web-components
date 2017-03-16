Basic Select:

```
initialState = {
  value: 'user',
  options: [{
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }]
};

<Select
  name="select_default"
  id="select_default"
  onChange={(value) => setState({ value })}
  value=""
  placeholder="Hello"
  options={state.options}
/>
```

Disabled Select

```
initialState = {
  value: 'user',
  options: [{
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }]
};

<Select
  name="select_disabled"
  id="select_disabled"
  disabled
  onChange={(value) => setState({ value })}
  value={state.value}
  options={state.options}
/>

```

Select with label

```

const options = [
  {
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }
];

<Select
  id="select_labeled"
  name="select_labeled"
  label="Select type"
  onChange={console.debug}
  value={''}
  options={options}
/>
```
