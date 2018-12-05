```jsx
const ToolbarAvatar = require('./ToolbarAvatar').default;
const ToolbarInfo = require('./ToolbarInfo').default;
const ToolbarButtons = require('./ToolbarButtons').default;
const IconButton = require('../IconButton/IconButton').default;

initialState = {
  peer: {
    title: 'Oleg Shilov',
    avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b',
    peer: {
      id: 123123,
    },
  },
  isFavourite: false,
  infoActve: false,
};

<div style={{ background: 'white' }}>
  <Toolbar>
    <ToolbarAvatar
      isFavourite={state.isFavourite}
      onFavouriteChange={(isFavourite) => setState({ isFavourite })}
      peerInfo={state.peer}
    />
    <ToolbarInfo
      title={state.peer.title}
      status="last seen 5 minutes ago"
      isVerified
    />
    <ToolbarButtons>
      <ToolbarCallButton onClick={console.debug} />
      <div style={{ marginRight: 8 }} />
      <ToolbarInfoButton
        active={state.infoActve}
        onClick={() => setState({ infoActve: !state.infoActve })}
      />
    </ToolbarButtons>
  </Toolbar>
</div>;
```
