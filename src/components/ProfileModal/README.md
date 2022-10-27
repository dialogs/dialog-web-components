Basic ProfileModal:

```
const initialState = {
  isOpen: false,
  state: {
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
}
const actions = {
  onChange: (profile) => {
    console.debug(profile);
    setState({
      state: {
        ...state.state,
        profile
      }
    });
  },
  onSubmit: (profile) => {
    console.debug(profile);
    setState({ ...initialState });
  },
  onAvatarChange: (avatar) => {
    console.debug(avatar);
  },
  onClose: () => setState({ ...initialState })
};

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>Edit profile</Button>
  {state.isOpen ? <ProfileModal {...state.state} {...actions} /> : null}
</div>
```
