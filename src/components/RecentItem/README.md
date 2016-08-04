Basic RecentItem:

    const peer = {
      id: 1,
      title: 'Some User',
      placeholder: 'blue'
    };
    <div style={{ width: 270, background: '#f5f5f5' }}>
      <RecentItem
        peer={peer}
        counter={10}
        onSelect={() => alert('Peer selected')}
      />
    </div>
