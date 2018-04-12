### Group welcome message

```jsx
const { group, user } = require('../../fixtures/peerInfo.js');

const actions = [{
  glyph: 'edit',
  title: 'Edit Group'
},{
  glyph: 'plus_outline',
  title: 'Add Description'
},{
  glyph: 'person',
  title: 'Add People'
}];

const renderActions = () => {
  return actions.map((action) => {
    return (
      <Button key={action.glyph} theme="primary" view="link" className="WelcomeMessage__button" size="small">
        <Icon glyph={action.glyph} size={20} className="WelcomeMessage__button__icon" />
        {action.title}
      </Button>
    );
  });
};

<WelcomeMessage
  type="group"
  title={group.title}
  about={group.about}
  creator={user.title}
  createdAt="10.12.2017"
  renderActions={renderActions}
/>
```

### Private chat welcome message

```jsx
const { user } = require('../../fixtures/peerInfo.js');

const actions = [{
  glyph: 'add_member',
  title: 'Add to contacts'
},{
  glyph: 'star_outline',
  title: 'Add to favourites'
}];

const renderActions = () => {
  return actions.map((action) => {
    return (
      <Button key={action.glyph} theme="primary" view="link" className="WelcomeMessage__button" size="small">
        <Icon glyph={action.glyph} size={20} className="WelcomeMessage__button__icon" />
        {action.title}
      </Button>
    );
  });
};

<WelcomeMessage
  type="user"
  title={user.title}
  userName={user.userName}
  about={user.about}
  renderActions={renderActions}
/>
```


### Channel welcome message

```jsx
const { channel } = require('../../fixtures/peerInfo.js');

const actions = [{
  glyph: 'add_member',
  title: 'Add to contacts'
},{
  glyph: 'star_outline',
  title: 'Add to favourites'
}];

const renderActions = () => {
  return actions.map((action) => {
    return (
      <Button key={action.glyph} theme="primary" view="link" className="WelcomeMessage__button" size="small">
        <Icon glyph={action.glyph} size={20} className="WelcomeMessage__button__icon" />
        {action.title}
      </Button>
    );
  });
};

<WelcomeMessage
  type="channel"
  title={channel.title}
  userName={channel.userName}
  about={channel.about}
  renderActions={renderActions}
/>
```
