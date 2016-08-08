Basic SidebarGroup:

    const items = [{
      peer: {
        id: 1,
        title: 'Some User',
        placeholder: 'orange'
      },
      counter: 6
    },{
      peer: {
        id: 2,
        title: 'Another User',
        placeholder: 'green',
        image: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10'
      },
      counter: 0
    },{
      peer: {
        id: 3,
        title: 'Group',
        placeholder: 'blue'
      },
      counter: 0,
      lastMessage: {
        peer: {
          id: 2,
          title: 'Another User',
          placeholder: 'green',
          image: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b'
        },
        message: 'Lorem ipsum dolor sit amet, consectetur.'
      }
    }];
    <div style={{ width: 270, background: '#f5f5f5' }}>
      <RecentGroup
        title="Group Title"
        items={items}
      />
    </div>
