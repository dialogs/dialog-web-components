Basic Modal:

    initialState = { isOpen: false };
    console.log(state);
    <div>
      <Button type="rised" onClick={() => setState({ isOpen: true })}>Open modal</Button>
      <Modal
        isOpen={state.isOpen}
        header="Simple modal"
        onClose={() => setState({ isOpen: false })}
      >
        Hello, world!
      </Modal>
    </div>

Fullscreen Modal:

    initialState = { isOpen: false };
    console.log(state);
    <div>
      <Button type="shade" onClick={() => setState({ isOpen: true })}>Open fullscreen modal</Button>
      <Modal
        isOpen={state.isOpen}
        onClose={() => setState({ isOpen: false })}
        header="Hello. I'm modal header!"
        fullscreen
      >
        Hi again. I'm inside fullscreen modal !!!
      </Modal>
    </div>
