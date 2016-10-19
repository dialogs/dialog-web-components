Basic ContactList:

```
initialState = {
  contacts: [{
    avatar: 'https://avatars0.githubusercontent.com/u/930121',
    name: 'Oleg',
    placeholder: 'red',
    uid: 930121
  }, {
    avatar: 'https://avatars0.githubusercontent.com/u/3505878',
    name: 'Nikita',
    about: 'Front end developer',
    placeholder: 'purple',
    uid: 3505878
  }],
  query: '',
  selected: []
};

<div style={{ width: 500, background: 'white'}}>
  <ContactList {...state} />
</div>
```
