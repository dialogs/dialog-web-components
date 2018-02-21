User profile:

```jsx
const user = {
  name: 'Steve Rodgers',
  nick: 'rodgers',
  about: 'Steve Rogers was a scrawny fine arts student growing up during the Great Depression. His alcoholic father died when Steve was a child, and his mother passed away from pneumonia after he graduated high school.',
  avatar: null,
  bigAvatar: null,
  placeholder: 'red',
  phones: [{ number: '+1 234 567 89 00', title: 'Mobile phone' }, { number: '+1 234 567 89 11', title: 'Mobile phone' }],
  emails: [{ email: 'cap@america.com', title: 'Home email' },{ email: 'cap1@america.com', title: 'Home email' }],
  customProfile: JSON.stringify({
    lastName: 'Rodgers 🦐',
    age: 97,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    done: true,
    telephone: '+1 234 567 89 00'
  })
};
const schema = JSON.stringify(require('../../fixtures/cutomProfileSchema.json'));
const online = {
  message: '3 minutes ago'
};

<div style={{ background: '#fff', width: 320 }}>
  <ActivityProfile info={user} online={online} type="user" schema={schema} />
</div>
```

Group profile:

```jsx
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
  message: '2 hours ago'
};
const onAboutEdit = () => console.debug('Edit about action');

<div style={{ background: '#fff', width: 320 }}>
  <ActivityProfile info={group} onAboutEdit={onAboutEdit} online={online} type="group">
  <div style={{ margin: '0px 5px', display: 'inline-block' }}>
    <IconButton
      glyph="star"
      key="more"
      size="large"
    />
  </div>
  <div style={{ margin: '0px 5px', display: 'inline-block' }}>
    <IconButton
      glyph="add_member"
      key="more"
      size="large"
    />
  </div>
  <div style={{ margin: '0px 5px', display: 'inline-block' }}>
    <IconButton
      glyph="more_outline"
      key="more"
      size="large"
    />
  </div>
  </ActivityProfile>
</div>

```
