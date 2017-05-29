```
const initial = {
  isOpen: false,
  appName: 'dialog',
  appVersion: '1.10.2',
  updateState: {
    value: 'upToDate',
    pending: false,
    error: null
  }
};
initialState = initial;

const actions = {
  onClose: () => {
    setState(initial);
  },
  onCheck: () => {
    setState({
      updateState: {
        ...state.updateState,
        pending: true
      }
    });
    setTimeout(() => {
      setState({
        updateState: {
          value: 'available',
          pending: false,
          error: null
        }
      });
    }, 2000);
  },
  onUpdate: () => {
    console.log('Update app');
  }
};

const handleOpen = () => {
  setState({ isOpen: true });
};

<div>
  <Button theme="primary" onClick={handleOpen}>Show about</Button>
  {state.isOpen ? (<AboutModal {...state} {...actions} />) : null}
</div>
```
