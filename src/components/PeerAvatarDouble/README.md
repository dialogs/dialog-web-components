This component is just a wrapper for `AvatarDouble` component, which get two `peerInfo` objects and substitute needed props to `AvatarDouble` directly

```jsx
const { user, bot, group } = require('../../fixtures/peerInfo');

<div>
  <PeerAvatarDouble big={group} small={user} size={50} onClick={console.log} />
  <span style={{ width: 10, display: 'inline-block' }} />
  <PeerAvatarDouble big={user} small={bot} size={50} onClick={console.log} />
  <span style={{ width: 10, display: 'inline-block' }} />
  <PeerAvatarDouble big={user} small={group} size={50} onClick={console.log} />
</div>;
```
