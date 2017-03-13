Basic AvatarSelector:

```
initialState = {
  avatar: null,
  placeholder: "empty",
  name: "Daredevil"
};

const onChange = (avatar) => {
  console.debug(avatar);
};

<AvatarSelector {...state} onChange={onChange} onRemove={() => setState({ avatar: null })} />
```
