```
const messages = require('../Message/fixtures/messages').messages;

<div>
  <MessageAttachment
    attachment={{
      type: 'reply',
      messages: [messages[0]]
    }}
  />
  <MessageAttachment
    attachment={{
      type: 'forward',
      messages: [
        messages[1],
        messages[3]
      ]
    }}
  />
</div>
```
