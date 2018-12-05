```jsx
const { selectFiles, fileToBase64 } = require('@dlghq/dialog-utils');
Image = () => document.createElement('img');
initialState = {
  image: null,
  cropped: null,
  height: 400,
  cropType: 'circle',
  cropSize: 300,
};

const actions = {
  onSelect(event) {
    selectFiles((files) => setState({ image: files[0] }), false, 'image/*');
  },
  onClose() {
    setState({ image: null });
  },
  onSubmit(image) {
    fileToBase64(image, (cropped) => {
      setState({
        cropped,
        image: null,
      });
    });
  },
};

<div>
  <Button onClick={actions.onSelect} theme="primary">
    Select file
  </Button>
  <hr />
  {state.image ? <ImageEdit {...state} {...actions} /> : null}
  {state.cropped ? <img src={state.cropped} /> : null}
</div>;
```

Render custom controls

```jsx
const { selectFiles, fileToBase64 } = require('@dlghq/dialog-utils');
Image = () => document.createElement('img');
initialState = {
  image: null,
  cropped: null,
  height: 400,
  cropType: 'circle',
  cropSize: 300,
};

const actions = {
  onSelect(event) {
    selectFiles((files) => setState({ image: files[0] }), false, 'image/*');
  },
  onClose() {
    setState({ image: null });
  },
  onSubmit(image) {
    fileToBase64(image, (cropped) => {
      setState({
        cropped,
        image: null,
      });
    });
  },
  renderFooter({ submit }) {
    return (
      <div onClick={submit} style={{ cursor: 'pointer' }}>
        CROP IMAGE
      </div>
    );
  },
  renderControls({
    rotateLeft,
    rotateRight,
    zoom: { onChange, value, minZoom },
  }) {
    console.log({ value });
    return (
      <div>
        <span onClick={rotateLeft} style={{ cursor: 'pointer' }}>
          Rotate Left
        </span>
        <span onClick={rotateRight} style={{ cursor: 'pointer' }}>
          Rotate Right
        </span>
        <div>
          Change Zoom
          <Range
            onChange={onChange}
            value={value}
            min={minZoom}
            max={2}
            step={0.001}
          />
        </div>
      </div>
    );
  },
};

<div>
  <Button onClick={actions.onSelect} theme="primary">
    Select file
  </Button>
  <hr />
  {state.image ? <ImageEdit {...state} {...actions} /> : null}
  {state.cropped ? <img src={state.cropped} /> : null}
</div>;
```
