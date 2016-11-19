Basic ActivityListMembers:

```
const members = [{
  peerInfo: {
    peer: {
      type: 'user',
      id: 1903089995,
      key: 'u1903089995'
    },
    title: 'Daredevil',
    userName: 'daredevil',
    avatar: 'https://avatars2.githubusercontent.com/u/930121',
    placeholder: 'purple',
    isVerified: false
  },
  isAdmin: true,
  canKick: true,
  kickState: {
    pending: false,
    error: null
  }
}];
const online = {
  isNotMember: false,
  message: '1 member, 1 online',
  online: 1,
  total: 3
};

<div style={{ background: '#fff', width: 320 }}>
  <ActivityListMembers members={members} online={online} />
</div>
```
