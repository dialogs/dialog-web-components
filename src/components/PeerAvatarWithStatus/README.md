```jsx
const users = [
  {
    peer: {
      title: 'Nikita Gusakov',
      avatar: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10',
      peer: {
        id: 432
      }
    },
    status: 'unset'
  },
  {
    peer: {
      title: 'Oleg Shilov',
      avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b',
      peer: {
        id: 41321
      }
    },
    status: 'away'
  },
  {
    peer: {
      title: 'Doctor Who',
      peer: {
        id: 4412
      }
    },
    status: 'do_not_disturb'
  },
  {
    peer: {
      title: 'Invisible man',
      peer: {
        id: 44122
      }
    },
    status: 'invisible'
  }
];

<div>
  {users.map((user, key) => <PeerAvatarWithStatus key={key} {...user} size={100} />)}
</div>
```
