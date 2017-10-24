```jsx
const messages = require('../../fixtures/messages');
const handleMediaClick = (message) => console.debug(message);

<div style={{ background: '#fff', width: 320 }}>
  <ActivityMedia
    onGoToMessage={handleMediaClick}
    messages={[
      messages[2],
      messages[4],
      messages[3],
      messages[5]
    ]}
  />
</div>
```
