```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../ContactList/mock/contacts.json');
const initial = {
  isOpen: false,
  selector: PeerInfoSelectorState.create(contacts),
  pending: false
};
initialState = initial;

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>
    Add member
  </Button>
  {
    state.isOpen
      ? <AddMembersModal
          selector={state.selector}
          onChange={(selector) => setState({ selector })}
          onClose={() => setState(initial)}
        />
      : null
  }
</div>
```
