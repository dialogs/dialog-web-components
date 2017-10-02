Message:

```jsx
const messages = require('../../fixtures/messages');

<div style={{background: '#fff'}}>
  {messages.map((message, index) => (
    <Message
      key={index}
      maxWidth={400}
      message={message}
      short={false}
    />
  ))}
</div>
```

Highlighted Message
-------------------

```jsx
const messages = require('../../fixtures/messages');

initialState = {
  highlight: false
};

handleClick = () => {
  setState({ highlight: true });
  setTimeout(() => setState({ highlight: false }), 3000);
};

<div>
  <Button theme="primary" size="small" onClick={handleClick}>Highlight</Button>
  <br />
  <br />
  <div style={{background: '#fff'}}>
    <Message
      short={false}
      message={messages[0]}
      highlight={state.highlight}
    />
  </div>
</div>
```

Message selection:

```jsx
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
        maxWidth={400}
        message={message}
        short={false}
        selected={getSelected(message)}
        onSelect={handleSelect}
      />
    );
  })}
</div>
```
