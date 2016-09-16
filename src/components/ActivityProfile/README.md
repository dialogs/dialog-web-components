Basic ActivityProfile:

```
const user = {
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
const peer1 = {
  id: 1,
  type: 'user'
};
const peer2 = {
  id: 101,
  type: 'group'
};
const alert = () => window.alert('!!!');

<div>
  <div style={{ width: '50%', float: 'left' }}>
    <ActivityProfile info={user} peer={peer1} onAboutAdd={alert}>
      <IconButton glyph="phone" size="large" />
      <IconButton glyph="more" size="large" />
    </ActivityProfile>
  </div>
  <div style={{ width: '50%', float: 'left' }}>
    <ActivityProfile info={group} peer={peer2} onAboutAdd={alert}>
      <IconButton glyph="phone" size="large" />
      <IconButton glyph="person_add" size="large" />
      <IconButton glyph="more" size="large" />
    </ActivityProfile>
  </div>
  <div style={{ clear: 'both' }} />
</div>
```
