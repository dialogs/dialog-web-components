Basic AddContactModal:

    let initialState = {
      isOpen: false,
      pending: false,
      contact: null
    };
    const handleOpen = () => setState({ isOpen: true });
    const handleClose = () => setState({ isOpen: false });
    const handleAdd = () => {
      setState({ pending: true });
      setTimeout(() => {
        setState({
          pending: false,
          contact: 'atatat'
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
        onComplite={handleClose}
        onClose={handleClose}
      />
    </div>
