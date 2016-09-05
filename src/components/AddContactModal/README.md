Basic AddContactModal:

```
let initialState = {
  isOpen: false,
  pending: false,
  contact: null
};
const contact = {
  avatar: 'https://http.dlg.im/v1/files/5793894363707576092/small-avatar.jpg?signature=511756a7d73aaefe705a7f255a6a79f83cde6200151ce66f21b49f23c47c2e5f&expires=1472295075754',
  placeholder: 'orange',
  name: 'Nikita',
  nick: 'gusnkt',
  peer: {
    id: 1643224499,
    type: 'user'
  }
};
const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });
const handleAdd = () => {
  setState({ pending: true });
  setTimeout(() => {
    setState({
      pending: false,
      contact: contact
    });
  }, 2000)
};

<div>
  <Button onClick={handleOpen}>Add contact</Button>
  <AddContactModal
    isOpen={state.isOpen}
    pending={state.pending}
    contact={state.contact}
    onAdd={handleAdd}
    onComplete={handleClose}
    onClose={handleClose}
  />
</div>
```
