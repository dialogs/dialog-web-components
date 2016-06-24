Basic Modal:

    <div>
      {'isOpen' in state || setState({ isOpen: false })}
      <Button onClick={() => {setState({ isOpen: true })}} type="rised">Open modal</Button>
      <Modal
        isOpen={state.isOpen}
        onClose={() => {setState({ isOpen: false })}}
        header="Simple modal"
      >
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
        header="Hello. I'm modal header!"
        fullscreen
      >
        Hi again. I'm inside fullscreen modal !!!
      </Modal>
    </div>
