Basic AddMembersModal:
```
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../ContactList/mock/contacts.json');

initialState = {
  isOpen: false,
  selector: PeerInfoSelectorState.create(contacts),
  pending: false
};

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>
    Add member
  </Button>
  {
    state.isOpen
      ? <AddMembersModal
          selector={state.selector}
          onChange={(selector) => setState({ selector })}
          onClose={() => setState(initialState)}
        />
      : null
  }
</div>
```
