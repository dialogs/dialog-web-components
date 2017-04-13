Peer Avatar

    const users = [
      {
        peer: {
          title: 'Nikita Gusakov',
          placeholder: 'red',
          avatar: 'https://www.gravatar.com/avatar/19c935592c57cbeeec09a3b3d23b5b10',
          peer: {
            id: 432
          }
        }
      },
      {
        peer: {
          title: 'Oleg Shilov',
          placeholder: 'green',
          avatar: 'https://www.gravatar.com/avatar/084643c42fcc4b48b985e4e744f0012b',
          peer: {
            id: 41321
          }
        },
        online: true
      },
      {
        peer: {
          title: 'Doctor Who',
          placeholder: 'lblue',
          peer: {
            id: 4412
          }
        },
        online: true
      }
    ];

    <div>
      {users.map((user, key) => <PeerAvatar key={key} {...user} size={100} />)}
    </div>
