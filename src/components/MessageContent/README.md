Text:

```
const textContent = {
  type: 'text',
  text: 'Hello, world!'
};

<MessageContent content={textContent} />
```

Markdown Text:

```
const text = require("raw!./Text/markdown.md");
const markdownText = {
  type: 'text',
  text: text
};

<MessageContent content={markdownText} />
```

Service:

```
const serviceContent = {
  type: 'service',
  text: 'Octocat joined group!'
};

<MessageContent content={serviceContent} />
```

Photo:

```
const photoContent = {
  type: 'photo',
  fileUrl: 'http://www.snapsbox.com/images/2015/12/15/outer_space_stars_galaxies_nasa_hubble_1920x1080_15173.jpg',
  fileName: 'outer_space_stars_galaxies_nasa_hubble_1920x1080_15173.jpg',
  preview: 'data:image/jpg;base64,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',
  width: 1920,
  height: 1080
};

<MessageContent content={photoContent} />
```

Document:

```
const documentContent = {
  type: 'document',
  preview: '',
  fileName: 'Dialog.dmg',
  fileExtension: 'dmg',
  fileUrl: 'https://dlg.im/dl/osx'
};


<MessageContent content={documentContent} />
```

Voice:

```
const initialState = {
  transcription: null
};
const voiceContent = {
  content: 'voice',
  type: 'voice',
  duration: 4920,
  fileExtension: 'opus',
  fileName: 'voice.opus',
  fileSize: '30 KB',
  fileUrl: 'http://www.html5tutorial.info/media/vincent.mp3',
  isUploading: false,
  transcription: state.transcription,
  isTranscriptionEnabled: true
};
const onGetTranscription = () => {
  setTimeout(() => {
    setState({ transcription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore maiores aliquam libero alias asperiores reprehenderit esse tenetur, praesentium labore nisi, repudiandae totam. Explicabo saepe illum, ipsa exercitationem molestias nobis culpa.'});
  }, 1000);
};

<MessageContent content={voiceContent} getTranscription={onGetTranscription} />
```
