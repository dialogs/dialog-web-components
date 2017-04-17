Basic SidebarContactItem:

```
const info = {
  peer: {
    id: 1,
    type: 'user'
  },
  title: 'Some User',
  placeholder: 'blue'
};
function handleSelect(peer) {
  alert(`Peer ${peer.id} selected`);
}

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarContactItem
    info={info}
    counter={0}
    onSelect={handleSelect}
  />
  <SidebarContactItem
    info={info}
    counter={10}
    onSelect={handleSelect}
  />
  <SidebarContactItem
    info={info}
    counter={0}
    active
    onSelect={handleSelect}
  />
</div>
```
