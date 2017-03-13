JoinModal:

```
initialState = { isOpen: false };
const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });

<div>
  <Button onClick={handleOpen} theme="primary">Join group</Button>
  {
    state.isOpen ? (
      <JoinModal
        groupTitle="American Options Public"
        onClose={handleClose}
      />
    ) : null
  }
</div>
```
