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
  fileExtension: 'jpg',
  fileName: 'o-BEST-SPACE-PHOTOS-2014-facebook.jpg',
  fileSize: '514 KB',
  fileUrl: 'http://i.huffpost.com/gen/2409604/images/o-BEST-SPACE-PHOTOS-2014-facebook.jpg',
  isUploading: false,
  preview: 'data:image/jpg;base64,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'
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
  fileUrl: 'https://storage.googleapis.com/prod-dlg-storage/dc20c3ad73d18a2931a0b353b39579f1577bce12%2Fvoice.opus?GoogleAccessId=devops@dialog-1320.iam.gserviceaccount.com&Expires=1475537982&Signature=eeSwVhn8Vp0%2FGEzItXJAzpETtdkPvGUve6pAjjyNDuesf01zoPoDqoESR0dhTE%2BygNvJibbk9RmqyhlDpqW%2Bs3WJu7PzIoovVoI2D0YMwoHByrdZXUI7kMiNzyoy6CCM6%2BligD6RWmtpsEDW5pihnZQrSwEd3hkvwuYpq2PME%2B%2B26vc4y3mUKnxoOx5UBKrSjfHVtogs0lTPCTqIvfceiFxnryab7bUefvXXcpXiQnO46VVk%2FBnqrOJLrbXNG%2Bt5nesypxQGteoqq3lKRF2fuKDpxSsBEXrG75oPBVLDf3VhMIFteYpic75gyqvRhdLHgQpynhsZM%2BvZMs9kRcMVvw%3D%3D',
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
