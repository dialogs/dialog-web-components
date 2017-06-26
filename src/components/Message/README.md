Message:

```
const messages = require('../../fixtures/messages');

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

Highlighted Message
-------------------

```
const messages = require('../../fixtures/messages');

initialState = {
  highlight: false
};

handleClick = () => {
  setState({ highlight: true });
  setTimeout(() => setState({ highlight: false }), 3000);
};

<div style={{background: '#fff'}}>
  <button onClick={handleClick}>Highlight</button>
  <Message
    short={false}
    message={messages[0]}
    highlight={state.highlight}
  />
</div>
```

Message selection:

```
const messages = require('../../fixtures/messages');

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

const getSelected = (message) => {
  if (state.selected.length) {
    return state.selected.indexOf(message.rid) > -1;
  }

  return null;
};

<div style={{background: '#fff'}}>
  {messages.map((message, index) => {
    return (
      <Message
        key={index}
        message={message}
        short={index > 0}
        selected={getSelected(message)}
        onSelect={handleSelect}
      />
    );
  })}
</div>
```
