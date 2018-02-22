```jsx
initialState = {
  isOpen: false,
  profile: null,
  schema: null,
  context: {
    name: {
      error: null,
      pending: false
    },
    nick: {
      error: null,
      pending: false
    },
    about: {
      error: null,
      pending: false
    },
    avatar: {
      error: null,
      pending: false
    }
  }
}

const actions = {
  onSubmit: (profile) => {
    console.debug(profile);
    setState({
      ...state,
      isOpen: false,
      profile: {
        ...state.profile,
        ...profile
      }
    });
  },
  onAvatarRemove: () => {
    console.debug('onAvatarRemove');
    setState({
      profile: {
        ...state.profile,
        avatar: null
      }
    });
  },
  onClose: () => setState({ isOpen: false })
};

const openModal = () => {
  setState({ isOpen: true });
  setTimeout(() => {
    setState({
      profile: {
        name: 'Some user',
        nick: null,
        about: null,
        avatar: null,
        phones: [{
          number: '+71233218855',
          title: 'Mobile phone'
        }],
        emails: [{
          email: 'someuser@domain.com',
          title: 'Email'
        }],
        customProfile: JSON.stringify({
          lastName: 'Rodgers 🦐',
          age: 97,
          bio: 'Roundhouse kicking asses since 1940',
          password: 'noneed',
          done: true,
          telephone: '+1 234 567 89 00'
        })
      },
      schema: JSON.stringify(require('../../fixtures/cutomProfileSchema.json'))
    });
  }, 2000);
};

<div>
  <Button theme="primary" onClick={openModal}>Edit profile</Button>
  {
    state.isOpen
      ? (
       <ProfileModal
          profile={state.profile}
          context={state.context}
          schema={state.schema}
          {...actions}
        />
      )
      : null
  }
</div>
```
