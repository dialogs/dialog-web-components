Basic ActivityProfile:

```
const user = {
  id: 1,
  type: 'user',
  name: 'Steve Rodgers',
  nick: 'rodgers',
  about: 'Steve Rogers was a scrawny fine arts student growing up during the Great Depression. His alcoholic father died when Steve was a child, and his mother passed away from pneumonia after he graduated high school.',
  avatar: null,
  bigAvatar: null,
  placeholder: 'red',
  presence: 'last seen 5 minutes ago',
  phones: [{ number: '+1 234 567 89 00', title: 'Mobile phone' }],
  emails: [{ email: 'cap@america.com', title: 'Home email' }]
};
const group = {
  id: 101,
  type: 'group',
  name: 'American Option Buddies',
  shortname: null,
  creator: 'Steve Rodgers',
  about: null,
  avatar: null,
  bigAvatar: null,
  placeholder: 'lblue',
  adminId: 1903089995,
  presence: '2 members, 1 online'
};

<div>
  <div style={{ width: '50%', float: 'left' }}>
    <ActivityProfile peerInfo={user} />
  </div>
  <div style={{ width: '50%', float: 'left' }}>
    <ActivityProfile peerInfo={group} />
  </div>
  <div style={{ clear: 'both' }} />
</div>
```
