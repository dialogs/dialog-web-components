Basic AvatarEditModal:

```
const { selectFiles, fileToBase64 } = require('@dlghq/dialog-utils');

initialState = {
  image: null,
  cropped: null,
};

const actions = {
  onSelect(event) {
    selectFiles((files) => {
      fileToBase64(files[0], (image) => {
        setState({ image })
      });
    }, false, 'image/*');
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
  <Button onClick={actions.onSelect} theme="primary" size="small">
    Select file
  </Button>
  <hr />
  {
    state.image ? (
      <AvatarEditModal {...state} {...actions} />
    ) : null
  }
  {
    state.cropped ? (
      <img src={state.cropped} />
    ) : null
  }
</div>
```
