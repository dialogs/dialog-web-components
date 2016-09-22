Basic AttachmentModal:

```
let initialState = {
  isOpen: false
};
const handleOpen = () => document.getElementById('attachment').click();
const handleInputChange = (event) => {
  setState({
    isOpen: true,
    attachments: event.target.files
  });
};
const handleClose = () => setState({ isOpen: false });
const handleSend = (attachment) => {
  alert(`File ${attachment.name} sended`)
  handleClose();
};

<div>
  <input
    id="attachment"
    onChange={handleInputChange}
    type="file"
    style={{
      visibility: 'hidden',
      display: 'none'
    }}
    multiple
  />
  <Button onClick={handleOpen}>Send attachment</Button>
  <AttachmentModal
    isOpen={state.isOpen}
    attachments={state.attachments}
    onClose={handleClose}
    onSend={handleSend}
  />
</div>
```
