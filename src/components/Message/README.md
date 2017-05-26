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
