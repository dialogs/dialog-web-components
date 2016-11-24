Basic Toolbar:

```
const ToolbarInfo = require('./ToolbarInfo').default;
const ToolbarButtons = require('./ToolbarButtons').default;
const IconButton = require('../IconButton/IconButton').default;

<div style={{ background: 'white' }}>
  <Toolbar>
    <ToolbarInfo title="Steve Rodgers" status="last seen 5 minutes ago" />
    <ToolbarButtons>
      <IconButton glyph="more" />
      <IconButton glyph="phone" style={{ marginLeft: 6 }} />
      <IconButton glyph="info" style={{ marginLeft: 6 }} />
    </ToolbarButtons>
  </Toolbar>
</div>
```
