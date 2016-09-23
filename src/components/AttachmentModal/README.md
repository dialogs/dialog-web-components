Basic AttachmentModal:

```
const selectFiles = require('../../utils/selectFiles').default;

initialState = {
  isOpen: false,
  attachments: []
};

const handleOpen = (event) => {
  selectFiles((files) => {
    setState({
      isOpen: true,
      attachments: files
    });
  });
};
const handleClose = () => setState(initialState);
const handleSend = (attachment) => {
  alert(`File ${attachment.name} sended`)
  handleClose();
};

<div>
  <Button onClick={handleOpen}>Send attachment</Button>
  <AttachmentModal
    isOpen={state.isOpen}
    attachments={state.attachments}
    onClose={handleClose}
    onSend={handleSend}
  />
</div>
```
