Markdown
--------

```
const text = require("raw-loader!./fixtures/markdown.md");

<Markdown text={text} />
```

Emoji only
----------

```
<Markdown text="😀"  />
```

```
<Markdown text=">😀"  />
```

Inline mode
-----------

```
<Markdown text="*Hello*, :dog:" inline />
```
