```
initialState = {
  isOpen: false
};

const handleClose = () => setState({ isOpen: false });
const handleOpen = () => setState({ isOpen: true });

<div>
  <Button theme="primary" onClick={handleOpen}>Open feedback</Button>
  {
    state.isOpen ? (
      <CallFeedback
        onClose={handleClose}
        onSubmit={(feedback) => console.debug(feedback)}
      />
    ) : null
  }
</div>
```
