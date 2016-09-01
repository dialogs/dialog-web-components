Basic JoinModal:

    let initialState = { isOpen: false };
    const handleOpen = () => setState({ isOpen: true });
    const handleClose = () => setState({ isOpen: false });

    <div>
      <Button onClick={handleOpen}>Join group</Button>
      <JoinModal
        isOpen={state.isOpen}
        onClose={handleClose}
        groupTitle="American Options Public"
      />
    </div>
