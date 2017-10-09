```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../ContactList/mock/contacts.json');

const initial = {
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
initialState = initial;

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState(initial);
const handleRequestChange = (request) => setState({ request });
const handleStepChange = (step) => setState({ step });
const handleSubmit = (request) => {
  console.debug(request);
  setState(initial);
};

<div>
  <Button theme="primary" onClick={handleOpen}>Create new</Button>
  {
    state.isOpen ? (
      <CreateNewModal
        isOpen={state.isOpen}
        step={state.step}
        request={state.request}
        shortnamePrefix="https://dlg.im/@"
        onClose={handleClose}
        onRequestChange={handleRequestChange}
        onStepChange={handleStepChange}
        onSubmit={handleSubmit}
      />
    ) : null
  }
</div>
```
