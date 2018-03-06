```jsx
initialState = {
  avatar: null,
  placeholder: "empty",
  name: "Daredevil"
};

const onChange = (avatar) => {
  setState({ avatar });
};

<AvatarSelector
  {...state}
  onChange={onChange}
  onRemove={() => setState({ avatar: null })}
  size={140}
/>
```
