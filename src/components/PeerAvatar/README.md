This component is just a wrapper for `Avatar` component, which get `peerInfo` object and substitute needed props to `Avatar` directly

```jsx
const { user, bot, group } = require('../../fixtures/peerInfo');

<div>
  <PeerAvatar peer={group} size={50} status="invisible" />
  <span style={{ width: 10, display: 'inline-block' }} />
  <PeerAvatar peer={user} size={50} status="do_not_disturb" />
  <span style={{ width: 10, display: 'inline-block' }} />
  <PeerAvatar peer={bot} size={50} status="unset" />
</div>;
```
