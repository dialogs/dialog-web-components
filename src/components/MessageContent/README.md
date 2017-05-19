Text
----

```
const content = {
  type: 'text',
  text: 'Hello, world :+1:'
};

<MessageContent content={content} />
```

```
const content = {
  type: 'text',
  text: 'Text with media',
  media: [null]
};

<MessageContent content={content} />
```

Service
-------

```
const content = {
  type: 'service',
  text: 'Octocat joined group!'
};

<MessageContent content={content} />
```

Photo
-----

```
const content = {
  type: 'photo',
  fileUrl: 'https://s3.amazonaws.com/psiu/wallpapers/heic0604a/heic0604a_desktop.jpg',
  fileName: 'heic0604a/heic0604a_desktop.jpg',
  preview: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAyAFoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDg6KKKYhSzMFDEkKMDJ6Dr/WjvSU9aBjRT2DBcHHqMHPbNSJErDg5OMnPFWVt1MRKctngelK5rGkyiR+dKEJzxWhDp0srBVQkmt2z8LyOoaU7R3qkjGTSOT8pscCkMTAZIrtrjQ7ezgJBBbGeSK5y5kVQUCjI/SrUYtbmLnO9rGSRiinP96m1DNhKKWgCkAoFSKpJwKFXJAFbOn6Y0gDyxPtyD1wMf5xzTSE5JFW0sJ7jOxeM4Ge5rX0/R54ruJJ1dCx7xkg4GcZH+eK6DR5LaOAGYCJlXOCMAgDrnt9Dzwabf6iFvkCEA5K8dQuPXnHP06D0rOcktjelzyepatbVI4oWChck7sgEj0ArJ1fV2hO2MsrhCeGIznoenFOk1PzUbIKkA4Irl76QFid2T7mpjeW45x5dhl1ezzMxmcue285IFUpN+0OwOG6E96R3zRLdTSwRQu5aKLOxT0GetamLISc0p4JAIPuKbRQIUCrEcee1QqxAxk4JyRUwn29OtNCd7aGlZJBFIrS4yOzHFa0viCJYliXG0jqnX/PWuWedn+8SfxpgfFVKV9CIU+V3bOguNcefhBsXAB3ckgev5mq0V0TPncR0HWsgPj2o8zAx61k4pnVCfKbc92i2yrvLEn5WxwBWXM6yKCzc4J9Oef/rVE8u+IKfvL39R71EzZ7AU0rFTqXEJyaSiimYBRRRQIWiiigAo70UUAFFFFAAOtJ3oooAO9FFFAxe1FFFAj//Z',
  width: 2560,
  height: 1440
};

<MessageContent content={content} />
```

Document
--------

```
initialState = {
  type: 'document',
  preview: '',
  fileName: 'dialog.dmg',
  fileExtension: 'dmg',
  fileUrl: 'https://dlg.im/dl/osx',
  fileSize: '666 Mb',
  isUploading: true
};

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

```
initialState = {
  content: 'voice',
  type: 'voice',
  duration: 4920,
  fileExtension: 'opus',
  fileName: 'voice.opus',
  fileSize: '30 KB',
  fileUrl: 'http://www.html5tutorial.info/media/vincent.mp3',
  isUploading: false,
};

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

```
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

```
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
