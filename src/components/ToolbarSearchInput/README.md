```
initialState = {
  query: ''
};

const onFocus = () => console.debug('focus');
const onBlur = () => console.debug('blur');

const onChange = (query) => {
  setState({ query });
};

const onSearch = (query) => {
  console.debug('Search: ', query);
};

<ToolbarSearchInput
  query={state.query}
  onFocus={onFocus}
  onBlur={onBlur}
  onChange={onChange}
  onSearch={onSearch}
/>
```
