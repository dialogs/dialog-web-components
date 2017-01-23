Message:

```
const messages = require('./fixtures/messages');

<div style={{background: '#fff'}}>
  {messages.map((message, index) => (
    <Message
      key={index}
      message={message} 
      short={index > 0} 
    />
  ))}
</div>
```

Selected Message:

```
const messages = require('./fixtures/messages');

<div style={{background: '#fff'}}>
  {messages.map((message, index) => (
    <Message
      key={index}
      message={message} 
      short={index > 0} 
      isSelected={index > 2}
      isSelectionMode={true}
    />
  ))}
</div>
```
