Message:

```
const messages = require('./fixtures/messages').messages;

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
const messages = require('./fixtures/messages').messages;

initialState = {
  selected: []
};

const handleSelect = (message) => {
  const selected = state.selected;
  const index = selected.indexOf(message.rid);
  
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(message.rid);    
  }
  
  setState({ selected });
};

<div style={{background: '#fff'}}>
  {messages.map((message, index) => {
    return (
      <Message
        key={index}
        message={message}
        short={index > 0}
        selected={state.selected.indexOf(message.rid) > -1}
        onSelect={handleSelect}
      />
    );
  })}
</div>
```

Attached Message:

```
const messages = require('./fixtures/messages').messages;
const peerInfo = require('./fixtures/messages').peerInfo;

initialState = {
  message: messages[0],
  attachment: {
    type: 'forward',
    from: peerInfo,
    messages: [
      messages[3],
      messages[4]
    ]
  }
};

<div style={{background: '#fff'}}>
  <Message
    message={messages[0]}
    attachment={{
      type: 'forward',
      from: peerInfo,
      messages: [
        messages[3],
        messages[4]
      ]
    }}
    onGoToPeer={console.debug}
    onGoToMessage={console.debug}
  />
  <Message
    message={{
      ...messages[2],
      state: 'read'
    }}
    attachment={{
      type: 'reply',
      message: messages[3]
    }}
    onGoToPeer={console.debug}
    onGoToMessage={console.debug}
  />
</div>
```
