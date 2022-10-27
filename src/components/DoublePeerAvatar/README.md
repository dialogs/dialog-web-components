Default DoublePeerAvatar

```
const users = [
  {
    title: 'Nikita Gusakov',
    placeholder: 'red',
    avatar: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10'
  }, {
    title: 'Oleg Shilov',
    placeholder: 'lblue',
    avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b'
  }
];

<DoublePeerAvatar
  peerBig={users[0]}
  peerSmall={users[1]}
  size={100}
/>
```

DoublePeerAvatar with placeholders

```
const users = [
  {
    title: 'Nikita Gusakov',
    placeholder: 'red',
    avatar: null
  }, {
    title: 'Oleg Shilov',
    placeholder: 'lblue',
    avatar: null
  }
];

<DoublePeerAvatar
  peerBig={users[1]}
  peerSmall={users[0]}
  size={100}
/>
```
