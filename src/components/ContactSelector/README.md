Basic ContactSelector:

```
const { ContactSelectorState } = require('../../entities');
const contacts = require('../ContactList/mock/contacts.json');

initialState = {
  selector: ContactSelectorState.create(contacts)
};

<div style={{ width: 500, background: 'white'}}>
  <ContactSelector
    autoFocus={false}
    selector={state.selector}
    onChange={(selector) => setState({ selector })}
  />
</div>
```
