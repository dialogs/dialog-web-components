Basic RecentCallItem:

```
const peers = [{
  avatar: 'https://avatars1.githubusercontent.com/u/930121',
  isVerified: false,
  placeholder: 'lblue',
  title: 'Oleg Shilov',
  userName: 'olegshilov',
  peer: {
    id: 1,
    type: 'user'
  }
}, {
  avatar: null,
  isVerified: false,
  placeholder: 'red',
  title: 'Gusakov Nikita',
  userName: 'gusnkt',
  peer: {
    id: 2,
    type: 'user'
  }
}, {
  avatar: '',
  isVerified: false,
  placeholder: 'purple',
  title: 'Example Group',
  peer: {
    id: 3,
    type: 'group'
  }
}];

const call = {
  date: new Date(),
  duration: 1232,
  id: '10001',
  initiator: peers[0],
  recipient: peers[1],
  isAnswered: true,
  isFinished: false
};

const call2 = {
  date: new Date(1485502268945),
  duration: 112,
  id: '10002',
  initiator: peers[1],
  recipient: peers[2],
  isAnswered: false,
  isFinished: true
};

const info = {
  peer: {
    id: 1,
    type: 'user'
  },
  title: 'Some User',
  placeholder: 'blue'
};

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarCallItem
    call={call}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={call2}
    uid={1}
    onSelect={console.debug}
  />
</div>
```
