### Text

```jsx
const content = {
  type: 'text',
  text: 'Hello, world :+1:'
};

<MessageContent content={content} />
```

```jsx
const content = {
  type: 'text',
  text: 'Text with media',
  media: [null]
};

<MessageContent content={content} />
```

### Service

```jsx
const content = {
  type: 'service',
  text: 'Octocat joined group!'
};

<MessageContent content={content} />
```

### Deleted

```jsx
const content = {
  type: 'deleted'
};

<MessageContent content={content} />
```

### Photo

```jsx
const messages = require('../../fixtures/messages');

<MessageContent content={messages[2].content} />
```

### Document

```jsx
const messages = require('../../fixtures/messages');

initialState = messages[4].content;

const toggleUpload = () => setState({ isUploading: !state.isUploading });

<div>
  <Button onClick={toggleUpload} theme="primary" size="small">Toggle upload</Button>
  <hr />
  <MessageContent content={state} />
</div>
```

### Voice

```jsx
const messages = require('../../fixtures/messages');

initialState = messages[3].content;

const toggleUpload = () => setState({ isUploading: !state.isUploading });

<div>
  <Button size="small" theme="primary" onClick={toggleUpload}>Toggle Upload</Button>
  <hr />
  <MessageContent content={state} />
</div>
```

### Video

```jsx
const messages = require('../../fixtures/messages');
initialState = messages[5].content;

<MessageContent content={state} />
```

```jsx
const messages = require('../../fixtures/messages');
initialState = Object.assign({}, messages[5].content, { fileUrl: null });

<MessageContent content={state} />
```

### Contact
```jsx
const messages = require('../../fixtures/messages');
initialState = messages[6].content;

<MessageContent content={state} />
```

### Location

```jsx
const messages = require('../../fixtures/messages');
initialState = messages[7].content;

<MessageContent content={state} />
```
