```jsx
const messages = require('../../fixtures/messages');
const from = require('../../fixtures/peerInfo');
const onGoToMessage = () => console.debug('onGoToMessage');

<div style={{background: '#fff'}}>
  <Message
    onGoToMessage={onGoToMessage}
    maxWidth={400}
    message={{
      ...messages[0],
      attachment: {
        type: 'reply',
        messages: [messages[3]]
      }
    }}
  />
  <Message
    onGoToMessage={onGoToMessage}
    maxWidth={400}
    message={{
      ...messages[0],
      attachment: {
        from,
        type: 'forward',
        messages: [messages[1], messages[3]]
      }
    }}
  />
  <Message
    onGoToMessage={onGoToMessage}
    message={{
      ...messages[0],
      attachment: {
        from,
        type: 'forward',
        messages: [messages[5]]
      }
    }}
  />
</div>
```
