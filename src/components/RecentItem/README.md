Basic Recent Item:

    const peerInfo = {
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
      <RecentItem
        peerInfo={peerInfo}
        counter={0}
        onSelect={handleSelect}
      />
      <RecentItem
        peerInfo={peerInfo}
        counter={10}
        onSelect={handleSelect}
      />
      <RecentItem
        peerInfo={peerInfo}
        counter={0}
        active
        onSelect={handleSelect}
      />
    </div>

Extended Recent Item:

    const peerInfo1 = {
      peer: {
        id: 1,
        type: 'user'
      },
      title: 'Dimon',
      placeholder: 'orange'
    };
    const peerInfo2 = {
      peer: {
        id: 2,
        type: 'user'
      },
      title: 'Jane Doe',
      placeholder: 'green'
    };
    const text = 'Lorem ipsum dolor sit amet, consectetur.';

    function handleSelect(peer) {
      alert(`Peer ${peer.id} selected`);
    }

    <div style={{ width: 270, background: '#f5f5f5' }}>
      <RecentItem
        peerInfo={peerInfo1}
        counter={0}
        text={text}
        onSelect={handleSelect}
        active
      />
      <RecentItem
        peerInfo={peerInfo1}
        counter={10}
        text={text}
        onSelect={handleSelect}
      />
      <RecentItem
        peerInfo={peerInfo2}
        counter={0}
        text={text}
        onSelect={handleSelect}
      />
    </div>
