```
const { group, user, channel, bot } = require('../../fixtures/peerInfo');
const items = [{
  ...group,
  description: group.about,
  members: 23,
  creator: user.title
}, {
  ...channel,
  description: channel.about,
  shortname: channel.userName,
  members: 420,
}, {
  ...user,
  description: user.about,
  shortname: user.userName
}, {
  ...bot,
  description: bot.about,
  shortname: bot.userName
}];

const onGoToPeer = (peer) => console.debug(`DISCOVER: go to peer: ${peer.id}`);
const onCreateNew = () => alert('Open create new modal');


<Discover
  items={items}
  onCreateNew={onCreateNew}
  onGoToPeer={onGoToPeer}
/>
```
