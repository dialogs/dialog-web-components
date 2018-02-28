
```jsx
const ActivityListItem = require('./ActivityListItem').default;
const ActivityListSwitcher = require('./ActivityListSwitcher').default;
const handleClick = () => console.debug('ActivityListItem clicked');

<div style={{ background: '#fff', width: 320 }}>
  <ActivityList>
    <ActivityListItem>
      First list item with just text inside
    </ActivityListItem>
    <ActivityListItem onClick={handleClick}>
      Clickable list item
    </ActivityListItem>
    <ActivityListItem icon={{ glyph: 'logo', theme: 'primary' }}>
      List item with icon
    </ActivityListItem>
    <ActivityListItem
      onClick={handleClick}
      icon={{ glyph: 'link', theme: 'success' }}
    >
      Clickable list item with icon
    </ActivityListItem>
    <ActivityListSwitcher
      value={state.isEnabled}
      onChange={(isEnabled) => setState({ isEnabled })}
    >
      List item with switcher
    </ActivityListSwitcher>
    <ActivityListSwitcher
      value={state.isEnabled}
      onChange={(isEnabled) => setState({ isEnabled })}
      icon={{ glyph: 'notifications', theme: 'danger' }}
    >
      Switchable list item with icon
    </ActivityListSwitcher>
  </ActivityList>
</div>
```
