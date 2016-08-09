Basic SidebarGroup:

    const items = [{
      peerInfo: {
        peer: {
          id: 1,
          type: 'user'
        },
        title: 'Some User',
        placeholder: 'orange'
      },
      counter: 6
    },{
      peerInfo: {
        peer: {
          id: 2,
          type: 'user'
        },
        title: 'Another User',
        placeholder: 'green',
        image: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10'
      },
      counter: 0
    },{
      peerInfo: {
        peer: {
          id: 3,
          type: 'group'
        },
        title: 'Group',
        placeholder: 'blue'
      },
      counter: 0,
      text: 'Lorem ipsum dolor sit amet, consectetur.'
    }];
    function handleSelect(peer) {
      alert(`peer ${peer.id}`);
    }

    <div style={{ width: 270, background: '#f5f5f5' }}>
      <RecentGroup
        title="Group Title"
        items={items}
        currentPeer={{
          id: 3,
          type: 'group'
        }}
        onSelect={handleSelect}
      />
    </div>
