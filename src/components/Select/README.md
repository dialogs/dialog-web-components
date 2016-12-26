Basic Select:

```
const options = [
  {
    value: 'user', title: 'User'
  }, {
    value: 'group', title: 'Group'
  }
];

initialState = {
  value: 'user',
  options: options
};

const handleChange = (value) => {
  setState({ value });
};

<div>
  <Select
    name="type"
    id="type"
    onChange={handleChange}
    value=""
    placeholder="Hello"
    options={state.options}
  />
  <br />
  <Select
    name="type2"
    id="type2"
    disabled
    onChange={handleChange}
    value={state.value}
    options={state.options}
  />
</div>
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
  name="type"
  label="Select type"
  id="type"
  onChange={console.debug}
  value={''}
  options={options}
/>
```
