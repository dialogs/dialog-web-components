EmojiList:

```
<EmojiList
  recent={['😀', '👻']}
  onClick={console.debug} 
/>
```

EmojiList with stickers:

```
const images = require('./fixtures/octodex.json');

const stickers = [];

for (let i = 0; i < parseInt(images.length / 7, 10); i++) {
  const start = i * 7;
  const end = start + 7;
  
  stickers.push({
    id: i,
    title: 'GitHub',
    stickers: images.slice(start, end).map((image, id) => {
      return {
        id,
        image,
        emoji: '😀'
      };
    })
  });
}

<EmojiList
  recent={['😀', '👻']}
  stickers={stickers}
  onClick={console.debug} 
/>
```
