Scroller parent container should have calculated dimensions
due internally Scroller uses [AutoSizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md).
Also we have `onUserScroll` and `onJSScroll` event handlers which detects how scroll be initiated

```jsx
const text = require('./mock/lorem.txt');

<div style={{ width: 300, height: 200 }}>
  <Scroller onScroll={() => console.log('onScroll')}>
    {text}
  </Scroller>
</div>
```

`ScrollTo` and `ScrollToBottom` methods

```jsx
const text = require('./mock/lorem.txt');
let scroller = null;

<div>
  <div className="styleguide__buttons">
    <Button theme="primary" onClick={() => scroller.scrollTo(100)} size="small">
      Scroll to 100
    </Button>
    <Button theme="primary" onClick={() => scroller.scrollToBottom()} size="small">
      Scroll to bottom
    </Button>
  </div>
  <div style={{ width: 300, height: 200 }}>
    <Scroller
      ref={(scrollerNode) => scroller = scrollerNode}
      onUserScroll={() => console.log('Scrolled by user')}
      onJSScroll={() => console.log('Scrolled by js')}
    >
      {text}
    </Scroller>
  </div>
</div>
```
