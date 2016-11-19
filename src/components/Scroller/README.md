Scroller parent container should have calculated dimensions
due internally Scroller uses [AutoSizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md).

```
const text = require('./mock/lorem.txt');

<div style={{ width: 300, height: 200 }}>
  <Scroller>
    {text}
  </Scroller>
</div>
```
