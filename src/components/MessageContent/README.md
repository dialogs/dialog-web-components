Text
----

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

Service
-------

```jsx
const content = {
  type: 'service',
  text: 'Octocat joined group!'
};

<MessageContent content={content} />
```

Photo
-----

```jsx
const messages = require('../../fixtures/messages');

<MessageContent content={messages[2].content} />
```

Document
--------

```jsx
const messages = require('../../fixtures/messages');

initialState = messages[4].content;

const toggleUpload = () => setState({ isUploading: !state.isUploading });

<div>
  <Button onClick={toggleUpload} theme="primary" size="small">Toggle upload</Button>
  <br />
  <br />
  <MessageContent content={state} />
</div>
```

Voice
-----

```jsx
const messages = require('../../fixtures/messages');

initialState = messages[3].content;

const toggleUpload = () => setState({ isUploading: !state.isUploading });

<div>
  <Button size="small" theme="primary" onClick={toggleUpload}>Toggle Upload</Button>
  <br />
  <br />
  <MessageContent content={state} />
</div>
```

Video
-----

```jsx
const content = {
  type: 'video',
  width: 640,
  height: 352,
  duration: 600,
  fileName: 'test.mp4',
  fileSize: '30 KB',
  preview: null,
  fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  isUploading: false
};

<MessageContent content={content} />
```

```jsx
const content = {
  type: 'video',
  width: 640,
  height: 352,
  duration: 600,
  fileName: 'test.mp4',
  fileSize: '30 KB',
  preview: null,
  fileUrl: null,
  isUploading: false
};

<MessageContent content={content} />
```
