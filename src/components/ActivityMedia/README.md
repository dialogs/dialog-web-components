```jsx
const messages = require('../../fixtures/messages');
const handleMediaClick = (message) => console.debug(message);

<div style={{ background: '#fff', width: 320 }}>
  <ActivityMedia
    onMediaClick={handleMediaClick}
    collection={[
      messages[2],
      messages[4],
      messages[3]
    ]}
  />
</div>
```
