```
const { group } = require('../../fixtures/peerInfo');

<DiscoverCard
  type="group"
  title={group.title}
  shortname={null}
  description={group.about}
  avatar={group.avatar}
  peer={group.peer}
  members={23}
  onGoToPeer={(peer) => console.log({ peer })}
/>
```
