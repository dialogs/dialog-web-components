Basic Modal:

    <div>
      {'isOpen' in state || setState({ isOpen: false })}
      <Button onClick={() => {setState({ isOpen: true })}}>Open modal</Button>
      <Modal isOpen={state.isOpen} onClose={() => {setState({ isOpen: false })}}>
        Hello, world!
      </Modal>
    </div>

Fullscreen Modal:

    <div>
      {'isOpen' in state || setState({ isOpen: false })}
      <Button onClick={() => {setState({ isOpen: true })}} type="shade">Open fullscreen modal</Button>
      <Modal
        isOpen={state.isOpen}
        onClose={() => {setState({ isOpen: false })}}
        fullscreen
      >
        Hello, i'm inside fullscreen modal !!!
      </Modal>
    </div>
