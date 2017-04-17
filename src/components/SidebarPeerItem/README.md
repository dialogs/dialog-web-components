```
initialState = {
  current: 0 
};

const info = [
  {
    peer: {
      id: 0,
      type: 'user'
    },
    title: 'Some User',
    placeholder: 'blue'
  },{
    peer: {
      id: 2,
      type: 'user'
    },
    title: 'Some User',
    placeholder: 'blue'
  },{
    peer: {
      id: 3,
      type: 'user'
    },
    title: 'Some User',
    placeholder: 'blue'
  }
];

const handleSelect = (peer) => setState({ current: peer.id });

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarPeerItem
    info={info[0]}
    counter={0}
    onSelect={handleSelect}
    active={state.current === info[0].peer.id}
  />
  <SidebarPeerItem
    info={info[1]}
    counter={10}
    onSelect={handleSelect}
    active={state.current === info[1].peer.id}
  />
  <SidebarPeerItem
    info={info[2]}
    counter={0}
    onSelect={handleSelect}
    active={state.current === info[2].peer.id}
  />
</div>
```
