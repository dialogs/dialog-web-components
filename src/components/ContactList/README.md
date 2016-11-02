Basic ContactList:

```
const { ContactSelectorState } = require('../../entities');
const contacts = require('./mock/contacts.json');

initialState = {
  selector: ContactSelectorState.create(contacts)
};

<div style={{ width: 500, background: 'white' }}>
  <ContactList
    selector={state.selector}
    onChange={(selector) => setState({ selector })}
  />
</div>
```
