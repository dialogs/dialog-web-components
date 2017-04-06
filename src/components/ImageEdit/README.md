Basic AvatarEditModal:

```
const { selectFiles, fileToBase64 } = require('@dlghq/dialog-utils');

initialState = {
  image: null,
  cropped: null,
  height: 400,
  cropType: 'circle',
  cropSize: 300
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
        image: null 
      });
    });
  }
};

<div>
  <Button onClick={actions.onSelect} theme="primary">
    Select file
  </Button>

  <hr />
  {
    state.image ? (
      <ImageEdit {...state} {...actions} />
    ) : null
  }
  {
    state.cropped ? (
      <img src={state.cropped} />
    ) : null
  }
</div>
```
