Basic Select:

```
const options = [
  {
    value: 'ara', title: 'Arabic'
  }, {
    value: 'zho', title: 'Chinese'
  }, {
    value: 'eng', title: 'English'
  }, {
    value: 'fra', title: 'French'
  }, {
    value: 'deu', title: 'German'
  }, {
    value: 'jpn', title: 'Japanese'
  }, {
    value: 'kor', title: 'Korean'
  }, {
    value: 'rus', title: 'Russian'
  }, {
    value: 'spa', title: 'Spanish'
  }, {
    value: 'tur', title: 'Turkish'
  }, {
    value: 'ukr', title: 'Ukrainian'
  }
];

initialState = {
  value: options[0],
  options: options
};

const handleChange = (value) => {
  console.debug('handleChange', value);
  setState({ value });
};

<div style={{height: 400}}>
  <Select
    onChange={handleChange}
    value={state.value}
    options={state.options}
  />
</div>
```
