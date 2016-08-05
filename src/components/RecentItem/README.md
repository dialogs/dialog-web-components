Basic Recent Item:

    const peer = {
      id: 1,
      title: 'Some User',
      placeholder: 'blue'
    };
    const lastMessage = {
      peer: peer,
      message: 'Lorem ipsum dolor sit amet, consectetur.'
    };
    function handleSelect(peer) {
      alert(`Peer ${peer.id} selected`);
    }

    <div style={{ width: 270, background: '#f5f5f5' }}>
      <RecentItem
        peer={peer}
        counter={0}
        onSelect={handleSelect}
      />
      <RecentItem
        peer={peer}
        counter={10}
        onSelect={handleSelect}
      />
      <RecentItem
        peer={peer}
        counter={0}
        active
        onSelect={handleSelect}
      />
    </div>

Extended Recent Item:

    const peer1 = {
      id: 1,
      title: 'Dimon',
      placeholder: 'orange'
    };
    const peer2 = {
      id: 2,
      title: 'Jane Doe',
      placeholder: 'green'
    };
    const lastMessage = {
      peer: peer1,
      message: 'Lorem ipsum dolor sit amet, consectetur.'
    };
    function handleSelect(peer) {
      alert(`Peer ${peer.id} selected`);
    }

    <div style={{ width: 270, background: '#f5f5f5' }}>
      <RecentItem
        peer={peer2}
        counter={0}
        lastMessage={lastMessage}
        onSelect={handleSelect}
        active
      />
      <RecentItem
        peer={peer1}
        counter={10}
        lastMessage={lastMessage}
        onSelect={handleSelect}
      />
      <RecentItem
        peer={peer2}
        counter={0}
        lastMessage={lastMessage}
        onSelect={handleSelect}
      />
    </div>
