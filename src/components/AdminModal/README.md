```jsx
const contacts = require('../ContactList/mock/contacts.json');

const group = {
  id: 123,
  type: 'channel',
  name: 'Test Group',
  about: null,
  avatar: null,
  bigAvatar: null,
  placeholder: 'red',
  adminId: 100500,
  members: contacts.map((contact) => {
    return {
      peerInfo: contact,
      permissions: []
    }
  }),
  isMember: true,
  canSendMessage: null,
  shortname: null,
  topic: null
};

initialState = {
  isOpen: false
};

const actions = {
  onAddAdmin: (...args) => console.log('onAddAdmin', ...args),
  onTransferOwnership: (...args) => console.log('onTransferOwnership', ...args),
  onClose: () => setState({ isOpen: false })
};

const handleOpen = () => setState({ isOpen: true });

<div>
  <Button theme="primary" onClick={handleOpen}>Add admin</Button>
  {
    state.isOpen ? (
      <AdminModal
        uid={100500}
        group={group}
        members={group.members}
        {...actions}
      />
    ) : null
  }
</div>
```
