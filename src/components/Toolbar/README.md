Basic Toolbar:

```
const ToolbarInfo = require('../ToolbarInfo/ToolbarInfo').default;
const ToolbarButtons = require('../ToolbarButtons/ToolbarButtons').default;
const IconButton = require('../IconButton/IconButton').default;
const info = {
  name: 'Steve Rodgers',
  presence: 'last seen 5 minutes ago'
};

<div style={{ background: 'white' }}>
  <Toolbar>
    <ToolbarInfo info={info} />
    <ToolbarButtons>
      <IconButton glyph="more" />
      <IconButton glyph="phone" style={{ marginLeft: 6 }} />
      <IconButton glyph="info" style={{ marginLeft: 6 }} />
    </ToolbarButtons>
  </Toolbar>
</div>
```
