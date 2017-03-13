Basic AddContactModal:

```
const users = [{
  id: 3505878,
  name: 'Nikita',
  nick: 'gusnkt',
  placeholder: 'red',
  avatar: 'https://avatars0.githubusercontent.com/u/3505878',
  isContact: true
},{
  id: 930121,
  name: 'Oleg Shilov',
  nick: 'olegshilov',
  placeholder: 'orange',
  avatar: 'https://avatars0.githubusercontent.com/u/930121'
}];

initialState = {
  isOpen: false,
  state: null
};

const handleOpen = () => {
  setState({
    isOpen: true,
    state: {
      query: '',
      error: null,
      pending: false,
      contact: null,
      added: false
    }
  });
};

const handleClose = () => {
  setState({
    isOpen: false,
    state: null
  });
};

const handleChange = (query) => {
  setState({
    state: {
      ...state.state,
      query,
      pending: true
    }
  });
};

const handleSearch = (query) => {
  setState({
    state: {
      ...state.state,
      pending: false,
      contact: users.find((user) => user.nick === query)
    }
  });
};

const handleAddContact = (id) => {
  setState({
    state: {
      ...state.state,
      added: true
    }
  });
};

<div>
  <Button theme="primary" onClick={handleOpen}>Add contact</Button>
  {
    state.isOpen ? (
      <AddContactModal
        {...state.state}
        onClose={handleClose}
        onChange={handleChange}
        onSearch={handleSearch}
        onAdd={handleAddContact}
        onOpenChat={handleClose}
      />
    ) : null
  }

</div>
```
