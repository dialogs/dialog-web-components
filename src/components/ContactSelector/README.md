```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

initialState = {
  selector: PeerInfoSelectorState.create(contacts)
};

<div style={{ width: 500, background: 'white' }}>
  <ContactSelector
    autoFocus={false}
    selector={state.selector}
    onChange={(selector) => setState({ selector })}
  />
</div>
```
