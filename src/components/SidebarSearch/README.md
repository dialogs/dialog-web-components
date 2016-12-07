Basic SidebarSearch:

```
initialState = { value: '' };

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarSearch
    value={state.value}
    onChange={(value) => setState({ value })}
    onFocus={() => console.info('search focus')}
    onBlur={() => console.info('search blur')}
  />
</div>
```
