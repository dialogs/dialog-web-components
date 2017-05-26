```
const messages = require('../Message/fixtures/messages').messages;
const from = require('../Message/fixtures/messages').peerInfo;

<div style={{background: '#fff'}}>
  <Message
    message={{
      ...messages[0],
      attachment: {
        type: 'reply',
        messages: [messages[1]]
      }
    }}
  />
  <Message
    message={{
      ...messages[0],
      attachment: {
        from,
        type: 'forward',
        messages: [messages[1], messages[3]]
      }
    }}
  />
</div>
```
