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
  }
}

const actions = {
  onSubmit: (profile) => {
    console.debug(profile);
    setState({
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
          {...actions}
        />
      )
      : null
  }
</div>
```
