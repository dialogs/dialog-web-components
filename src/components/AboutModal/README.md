```jsx
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
        value: 'upToDate',
        pending: true,
        error: null
      }
    });
    
    setTimeout(() => {
      setState({
        updateState: {
          value: 'available',
          pending: true,
          error: null
        }
      });
    }, 2000);
    
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setState({
          updateState: {
            value: 'available',
            pending: false,
            error: null
          }
        });
      } else {
        setState({
          updateState: {
            value: 'available',
            pending: false,
            error: new Error('Update failed')
          }
        });
      }
    }, 10000);
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
