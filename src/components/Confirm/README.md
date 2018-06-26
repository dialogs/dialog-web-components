Danger:

```jsx
initialState = {
  isOpen: false
};

const onOpen = () => setState({ isOpen: true });
const onClose = () => {
  console.log('confirm closed');
  setState({ isOpen: false });
};
const onSubmit = () => {
  console.log('confirm submitted');
  setState({ isOpen: false })
};

<div>
  <Button theme="danger" size="small" onClick={onOpen}>Delete Message</Button>
  {
    state.isOpen ? (
      <Confirm
        message="Are you going to delete this message?"
        submit="Delete"
        cancel="Cancel"
        theme="danger"
        onSubmit={onSubmit}
        onClose={onClose}
      />
    ) : null
  }
</div>
```

Warning:

```jsx
initialState = {
  isOpen: false
};

const onOpen = () => setState({ isOpen: true });
const onClose = () => {
  console.log('confirm closed');
  setState({ isOpen: false });
};
const onSubmit = () => {
  console.log('confirm submitted');
  setState({ isOpen: false })
};


<div>
  <Button theme="warning" size="small" onClick={onOpen}>Clear chat</Button>
  {
    state.isOpen ? (
      <Confirm
        message="Are you going to clear chat history?"
        submit="Clear"
        cancel="Cancel"
        theme="warning"
        onSubmit={onSubmit}
        onClose={onClose}
      />
    ) : null
  }
</div>
```

Success:

```jsx
initialState = {
  isOpen: false
};

const onOpen = () => setState({ isOpen: true });
const onClose = () => {
  console.log('confirm closed');
  setState({ isOpen: false });
};
const onSubmit = () => {
  console.log('confirm submitted');
  setState({ isOpen: false })
};


<div>
  <Button theme="success" size="small" onClick={onOpen}>Add user</Button>
  {
    state.isOpen ? (
      <Confirm
        message="Are you going to add this user to contacts?"
        submit="Add"
        cancel="Cancel"
        theme="success"
        onSubmit={onSubmit}
        onClose={onClose}
      />
    ) : null
  }
</div>

```
