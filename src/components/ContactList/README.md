Basic ContactList:

```
initialState = {
  contacts: [{
    avatar: 'https://avatars0.githubusercontent.com/u/930121',
    name: 'Oleg',
    placeholder: 'red',
    uid: 495282826,
    isSelected: true
  }, {
    avatar: 'https://avatars0.githubusercontent.com/u/3505878',
    name: 'Nikita',
    about: 'Front end developer',
    placeholder: 'purple',
    uid: 123,
    isHovered: true
  }]
};

<div style={{ width: 500, background: 'white'}}>
  <ContactList contacts={state.contacts}/>
</div>
```
