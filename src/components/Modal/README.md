Basic Modal:

```
const {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose
} = require('../../index');

initialState = { isOpen: false };

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });

<div>
  <Button theme="primary" onClick={handleOpen}>Open modal</Button>
  {
    state.isOpen ? (
      <Modal onClose={handleClose}>
        <ModalHeader withBorder>
          Simple modal
          <ModalClose onClick={handleClose} />
        </ModalHeader>
        <ModalBody>
          <p>Hello, world!</p>
        </ModalBody>
        <ModalFooter withBorder>Footer content can be placed here</ModalFooter>
      </Modal>
    ) : null
  }
</div>
```

Fullscreen Modal:

```
const {
  ModalHeader,
  ModalBody,
  ModalClose
} = require('../../index');

initialState = { isOpen: false };

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });

<div>
  <Button theme="primary" onClick={handleOpen}>Open fullscreen modal</Button>
  {
    state.isOpen ? (
      <Modal fullscreen onClose={handleClose}>
        <ModalClose onClick={handleClose} />
        <ModalHeader>Simple modal</ModalHeader>
        <ModalBody>
          <p>Hi again. I'm inside fullscreen modal!!!</p>
        </ModalBody>
      </Modal>
    ) : null
  }
</div>
```
