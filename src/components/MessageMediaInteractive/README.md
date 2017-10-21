```jsx
const messagesMedia = require('../../fixtures/messagesMedia');

const handleSubmit = (id, value) => {
  alert(`Interactive action submit: ${id} => ${value}`);
};

<MessageMediaInteractive 
  media={messagesMedia.interactive} 
  onSubmit={handleSubmit}
/>
```
