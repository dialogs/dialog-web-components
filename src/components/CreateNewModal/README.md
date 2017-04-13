Basic CreateNewModal:

```
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../ContactList/mock/contacts.json');

initialState = {
  isOpen: false,
  step: 'type',
  request: {
    type: 'group',
    title: '',
    shortname: '',
    about: '',
    avatar: null,
    members: PeerInfoSelectorState.create(contacts),
  }
};

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState(initialState);
const handleRequestChange = (request) => setState({ request });
const handleStepChange = (step) => setState({ step });
const handleSubmit = (request) => {
  console.debug(request);
  setState(initialState);
};

<div>
  <Button theme="primary" onClick={handleOpen}>Create new</Button>
  {
    state.isOpen ? (
      <CreateNewModal
        isOpen={state.isOpen}
        step={state.step}
        request={state.request}
        onClose={handleClose}
        onRequestChange={handleRequestChange}
        onStepChange={handleStepChange}
        onSubmit={handleSubmit}
      />
    ) : null
  }
</div>
```
