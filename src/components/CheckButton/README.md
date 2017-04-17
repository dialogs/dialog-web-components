Basic CheckButton:

```
initialState = {
  checked: true
};

const handleClick = (checked) => setState({ checked });

<div>
  <CheckButton checked={state.checked} onClick={handleClick} />
  <CheckButton checked={state.checked} onClick={handleClick} theme="success" />
  <CheckButton checked={state.checked} onClick={handleClick} theme="danger" />
  <CheckButton checked={state.checked} onClick={handleClick} theme="info" />
  <CheckButton checked={state.checked} onClick={handleClick} theme="warning" />
</div>
```
