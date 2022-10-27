Basic AttachmentModal:

```
const { selectFiles } = require('@dlghq/dialog-utils');

initialState = {
  current: 0,
  attachments: []
};

const actions = {
  onOpen(event) {
    selectFiles((files) => {
      setState({
        attachments: files.map((file) => ({
          file,
          isDocument: !file.type.startsWith('image')
        }))
      });
    }, true);
  },
  onSend(attachments) {
    setState({
      current: 0,
      attachments: state.attachments.filter((attachment) => {
        return attachments.indexOf(attachment) === -1;
      })
    });
  },
  onSendAll() {
    setState(initialState);
  },
  onClose() {
    setState(initialState);
  },
  onCurrentChange(current) {
    setState({ current });
  },
  onAttachmentChange(index, nextAttachment) {
    setState({
      attachments: state.attachments.map((attachment, idx) => {
        if (idx === index) {
          return nextAttachment;
        }

        return attachment;
      })
    });
  }
};

<div>
  <Button theme="primary" onClick={actions.onOpen}>Send attachment</Button>
  {
    state.attachments.length ? (
      <AttachmentModal
        {...state}
        {...actions}
      />
    ) : null
  }
</div>
```
