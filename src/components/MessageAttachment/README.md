```jsx
const messages = require('../../fixtures/messages');
const { user } = require('../../fixtures/peerInfo');
const onGoToMessage = () => console.debug('onGoToMessage');

<div style={{background: '#fff'}}>
  <Message
    onGoToMessage={onGoToMessage}
    maxWidth={400}
    message={{
      ...messages[0],
      attachment: {
        type: 'reply',
        messages: [messages[1]]
      }
    }}
  />
  <Message
    onGoToMessage={onGoToMessage}
    maxWidth={400}
    message={{
      ...messages[0],
      attachment: {
        from: user,
        type: 'forward',
        messages: [messages[1], messages[3]]
      }
    }}
  />
  <Message
    onGoToMessage={onGoToMessage}
    maxWidth={400}
    message={{
      ...messages[0],
      attachment: {
        from: user,
        type: 'forward',
        messages: [messages[5]]
      }
    }}
  />
</div>
```
