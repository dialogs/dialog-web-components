Basic EditGroupModal:

```
initialState = {
  isOpen: false,
  info: {
    type: 'group',
    title: '',
    shortname: '',
    about: '',
    avatar: null,
  }
};

const handleClose = () => setState(initialState);
const handleChange = (info) => setState({ info })
const handleSubmit = () => setState(initialState);

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>Edit Group</Button>
  {
    state.isOpen
      ? <EditGroupModal
          info={state.info}
          onClose={handleClose}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      : null
  }
</div>
```
