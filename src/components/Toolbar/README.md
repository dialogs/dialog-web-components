Basic Toolbar:

```
const ToolbarAvatar = require('./ToolbarAvatar').default;
const ToolbarInfo = require('./ToolbarInfo').default;
const ToolbarButtons = require('./ToolbarButtons').default;
const IconButton = require('../IconButton/IconButton').default;

initialState = {
  peer: {
    title: 'Oleg Shilov',
    placeholder: 'purple',
    avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b'
  },
  isFavourite: false
};

const handleFavouriteClick = (value) => {
  setState({ isFavourite: value });
};

<div style={{ background: 'white' }}>
  <Toolbar>
    <ToolbarAvatar active={state.isFavourite} onFavouriteChange={handleFavouriteClick} peerInfo={state.peer} />
    <ToolbarInfo title={state.peer.title} status="last seen 5 minutes ago" />
    <ToolbarButtons>
      <IconButton glyph="more" />
      <IconButton glyph="phone" style={{ marginLeft: 6 }} />
      <IconButton glyph="info" style={{ marginLeft: 6 }} />
    </ToolbarButtons>
  </Toolbar>
</div>
```
