Basic EditGroupModal:

```
initialState = {
  isOpen: false,
  group: {
    id: '1001',
    type: 'group',
    avatar: null,
    name: 'Example group',
    shortname: null,
    about: null,
  },
  name: {
    error: null,
    pending: false
  },
  shortname: {
    error: null,
    pending: false
  },
  about: {
    error: null,
    pending: false
  }
};

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>Edit Group</Button>
  {
    state.isOpen
      ? <EditGroupModal
          group={state.group}
          name={state.name}
          shortname={state.shortname}
          about={state.about}
          onClose={() => setState(initialState)}
          onNameChange={console.debug}
          onShortnameChange={console.debug}
          onAboutChange={console.debug}
          onAvatarChange={console.debug}
          onAvatarRemove={console.debug}
        />
      : null
  }
</div>
```
