Basic Radio:

```
const initialState = {
  value: 'group'
};
const handleChange = (value) => setState({ value });

<div>
  <h3>Current value: { state.value }</h3>
  <hr />
  <Radio
    value={'group'}
    defaultChecked={'group' === state.value}
    onChange={handleChange}
    name="type1"
  />
  <Radio
    value={'channel'}
    defaultChecked={'channel' === state.value}
    onChange={handleChange}
    name="type1"
  />
</div>
```

You can render labeled content as children of Radio component:

```
const initialState = {
  value: 'group'
};
const handleChange = (value) => setState({ value });

<div>
  <Radio
    value={'group'}
    defaultChecked={'group' === state.value}
    onChange={handleChange}
    name="type2"
  >
    Group
  </Radio>
  <br />
  <Radio
    value={'channel'}
    defaultChecked={'channel' === state.value}
    onChange={handleChange}
    name="type2"
  >
    Channel
  </Radio>
</div>
```
