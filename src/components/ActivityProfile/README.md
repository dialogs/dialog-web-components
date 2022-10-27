Basic ActivityProfile:

```
const user = {
  name: 'Steve Rodgers',
  nick: 'rodgers',
  about: 'Steve Rogers was a scrawny fine arts student growing up during the Great Depression. His alcoholic father died when Steve was a child, and his mother passed away from pneumonia after he graduated high school.',
  avatar: null,
  bigAvatar: null,
  placeholder: 'red',
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
  adminId: 1001
};
const online = {
  message: '3 minutes ago'
};
const alert = () => window.alert('!!!');

<div>
  <div style={{ background: '#fff', width: 320, float: 'left'  }}>
    <ActivityProfile info={user} online={online} type="user" />
  </div>
  <div style={{ background: '#fff', width: 320, float: 'left'  }}>
    <ActivityProfile info={group} onAboutEdit={alert} online={online} type="group">
      <IconButton
        glyph="more_outline"
        key="more"
        size="large"
      />
    </ActivityProfile>
  </div>
  <div style={{ clear: 'both' }} />
</div>
```
