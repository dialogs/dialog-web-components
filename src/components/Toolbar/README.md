Basic Toolbar:

```
const ToolbarInfo = require('../ToolbarInfo/ToolbarInfo').default;
const ToolbarButtons = require('../ToolbarButtons/ToolbarButtons').default;
const IconButton = require('../IconButton/IconButton').default;
const peerInfo = {
  peer: {
    id: 1,
    type: 'user'
  },
  title: 'Steve Rodgers',
  placeholder: 'red',
  status: 'last seen 5 minutes ago'
};

<div style={{ background: 'white' }}>
  <Toolbar>
    <ToolbarInfo peerInfo={peerInfo} />
    <ToolbarButtons>
      <IconButton glyph="more" />
      <IconButton glyph="phone" style={{ marginLeft: 6 }} />
      <IconButton glyph="info" style={{ marginLeft: 6 }} />
    </ToolbarButtons>
  </Toolbar>
</div>
```
