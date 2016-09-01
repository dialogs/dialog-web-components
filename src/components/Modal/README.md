Basic Modal:

    const ModalHeader = require('./ModalHeader').default;
    const ModalClose = require('./ModalClose').default;
    const ModalBody = require('./ModalBody').default;
    const ModalFooter = require('./ModalFooter').default;
    let initialState = { isOpen: false };
    const handleOpen = () => setState({ isOpen: true });
    const handleClose = () => setState({ isOpen: false });

    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        isOpen={state.isOpen}
        onClose={handleClose}
      >
        <ModalHeader>
          Simple modal
          <ModalClose onClick={handleClose} />
        </ModalHeader>
        <ModalBody>
          <p>Hello, world!</p>
        </ModalBody>
        <ModalFooter>Footer content can be placed here</ModalFooter>
      </Modal>
    </div>

Fullscreen Modal:

    const ModalHeader = require('./ModalHeader').default;
    const ModalClose = require('./ModalClose').default;
    const ModalBody = require('./ModalBody').default;
    let initialState = { isOpen: false };
    const handleOpen = () => setState({ isOpen: true });
    const handleClose = () => setState({ isOpen: false });

    <div>
      <Button onClick={handleOpen}>Open fullscreen modal</Button>
      <Modal
        isOpen={state.isOpen}
        onClose={handleClose}
        fullscreen
      >
        <ModalClose onClick={handleClose} />
        <ModalHeader>Simple modal</ModalHeader>
        <ModalBody>
          <p>Hi again. I'm inside fullscreen modal!!!</p>
        </ModalBody>
      </Modal>
    </div>
