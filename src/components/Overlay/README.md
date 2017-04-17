Basic Overlay:

```
initialState = {
  active: false
};

const toggleOverlay = () => {
  setState({ active: !state.active });
};

<div>
  <Button onClick={toggleOverlay} theme="primary">Toggle overlay</Button>
  <hr />
  <div style={{ width: '100%', height: 200 }}>
  <Overlay active={state.active}>
    Some content inside Overlay!
  </Overlay>
  </div>
</div>
```

Overlay with caption:

```
initialState = {
  active: false
};

const toggleOverlay = () => {
  setState({ active: !state.active });
};

const renderCaption = () => {
  return (
    <div>
      <h2>Overlay caption!</h2>
      <p>More text inside caption</p>
    </div>
  );
};

<div>
  <Button onClick={toggleOverlay} theme="primary">Toggle overlay</Button>
  <hr />
  <div style={{ width: '100%', height: 200 }}>
  <Overlay active={state.active} renderCaption={renderCaption}>
    Some content inside Overlay!
  </Overlay>
  </div>
</div>
```
