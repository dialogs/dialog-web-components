Group welcome message

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
      <Button key={action.glyph} theme="primary" view="link" className="WelcomeMessage__button">
        <Icon glyph={action.glyph} size={20} className="WelcomeMessage__button__icon" />
        {action.title}
      </Button>
    );
  });
};

<WelcomeMessage
  info={{
    type: "group",
    group: group,
    creator: user.title,
    createdAt: "10.12.2017"
  }}
  renderActions={renderActions}
/>
```

Private chat welcome message

```jsx
const { user } = require('../../fixtures/peerInfo.js');

<WelcomeMessage
  info={{
    type: 'user',
    user: user
  }}
/>
```
