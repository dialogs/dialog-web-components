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
  isOpen: false,
  action: {
    pending: false,
    error: null
  }
};

const actions = {
  onAddAdmin: (...args) => {
    console.log('onAddAdmin', ...args)
    setState({ action: { pending: true, error: null } });
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setState({ isOpen: true, action: { pending: false, error: new Error('Unexpected error') } });
      } else {
        setState({ isOpen: false, action: { pending: false, error: null } });
      }
    }, 3000);
  },
  onTransferOwnership: (...args) => {
    console.log('onTransferOwnership', ...args)
    setState({ action: { pending: true, error: null } });
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setState({ isOpen: true, action: { pending: false, error: new Error('Unexpected error') } });
      } else {
        setState({ isOpen: false, action: { pending: false, error: null } });
      }
    }, 3000);
  },
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
        action={state.action}
        {...actions}
      />
    ) : null
  }
</div>
```
