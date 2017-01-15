Peer Avatar

    const users = [
      {
        peer: {
          title: 'Nikita Gusakov',
          placeholder: 'red',
          avatar: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10'
        }
      },
      {
        peer: {
          title: 'Oleg Shilov',
          placeholder: 'green',
          avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b'
        },
        online: true
      },
      {
        peer: {
          title: 'Doctor Who',
          placeholder: 'lblue'
        },
        online: true
      }
    ];

    <div>
      {users.map((user, key) => <PeerAvatar key={key} {...user} />)}
    </div>
