Basic ProfileModal:

```
const initialState = {
  isOpen: false,
  profile: {
    name: 'Some user',
    nick: null,
    about: null,
    avatar: null,
    phones: [{
      number: '71233218855',
      title: 'Mobile phone'
    }],
    emails: [{
      email: 'someuser@domain.com',
      title: 'Email'
    }]
  },
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
  onClose: () => setState({ ...initialState })
};

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>Edit profile</Button>
  {
    state.isOpen
      ? (
       <ProfileModal
          profile={state.profile}
          context={state.context}
          {...actions}
        />
      )
      : null
  }
</div>
```
