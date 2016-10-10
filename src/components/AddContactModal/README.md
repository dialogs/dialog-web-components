Basic AddContactModal:

```
const users = [
  {
    id: 3505878,
    name: 'Nikita',
    nick: 'gusnkt',
    placeholder: 'red',
    avatar: 'https://avatars0.githubusercontent.com/u/3505878'
  },
  {
    id: 930121,
    name: 'Oleg Shilov',
    nick: 'olegshilov',
    placeholder: 'orange',
    avatar: 'https://avatars0.githubusercontent.com/u/930121'
  },
];

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
      contact: null
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
  setTimeout(() => {
    setState({
      state: {
        ...state.state,
        pending: false,
        contact: users.find((user) => user.nick === query)
      }
    });
  }, 1000);
};

const handleSubmit = () => {
  setState({
    state: {
      ...state.state,
      pending: true
    }
  });

  setTimeout(handleClose, 2000)
};

<div>
  <Button onClick={handleOpen}>Add contact</Button>
  {
    state.isOpen ? (
      <AddContactModal
        {...state.state}
        onClose={handleClose}
        onChange={handleChange}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
      />
    ) : null
  }

</div>
```
