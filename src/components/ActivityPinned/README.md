```jsx
const messages = require('../../fixtures/messages');
const { group } = require('../../fixtures/peerInfo');

const handleMessageClick = (peer, message) => console.debug('handleMessageClick', {peer, message});
const handleMessageDelete = (message) => console.debug('handleMessageDelete', message);
const handleGoToPeer = (peer) => console.debug('handleGoToPeer', peer);
const handleLightboxOpen = (message) => console.debug('handleLightboxOpen', message);

<div style={{ background: '#fff', width: 320 }}>
  <ActivityPinned
    onGoToMessage={handleMessageClick}
    onGoToPeer={handleGoToPeer}
    onDeleteMessage={handleMessageDelete}
    onLightboxOpen={handleLightboxOpen}
    info={group}
    messages={[
      messages[0],
      messages[2],
      messages[3],
      messages[5]
    ]}
  />
</div>
```
