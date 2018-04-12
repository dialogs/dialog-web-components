### Markdown

```jsx
const text = require("raw-loader!../../fixtures/markdown.md");

<Markdown text={text} />
```

### Emoji only

```jsx
<Markdown text="😀🐱" />
```

### Inline mode

```jsx
<Markdown text="*Hello*, :dog:" inline />
```
