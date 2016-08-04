User Avatar

    const user1 = {
      title: 'nkt',
      placeholder: 'red',
      avatar: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10'
    };
    const user2 = {
      title: 'Oleg Shilov',
      placeholder: 'green',
      avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b'
    };

    <div>
      <UserAvatar user={user1} />
      <UserAvatar user={user2} online />
    </div>
