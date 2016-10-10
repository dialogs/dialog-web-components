Basic CreateNewModal:

```
initialState = {
  isOpen: false,
  step: 'type',
  request: {
    type: 'group',
    title: '',
    shortname: '',
    about: '',
    avatar: null
  }
};

const handleOpen = () => setState({ isOpen: true });

const actions = {
  onClose: () => setState(initialState),
  onRequestChange: (request) => {
    console.debug({ ...request });
    setState({ request });
  },
  onStepChange: (step) => setState({ step }),
  onSubmit: (request) => {
  	console.log({ ...request });
    setState({ ...initialState });
  }
};

<div>
  <Button onClick={handleOpen}>Create new</Button>
  {
    state.isOpen ? (
      <CreateNewModal
        {...state}
        {...actions}
      />
    ) : null
  }
</div>
```
