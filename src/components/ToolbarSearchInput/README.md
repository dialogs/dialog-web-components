```
initialState = {
  query: '',
  pending: false
};

const onFocus = () => console.debug('focus');
const onBlur = () => console.debug('blur');

const onChange = (query) => {
  setState({ query, pending: true });
};

const onSearch = (query) => {
  console.debug('Search: ', query);
  setState({ pending: false });
};

const onCancel = () => {
  setState({ ...initialState });
};

<ToolbarSearchInput
  query={state.query}
  pending={state.pending}
  onFocus={onFocus}
  onBlur={onBlur}
  onChange={onChange}
  onSearch={onSearch}
  onCancel={onCancel}
/>
```
