```jsx
const nkt = {
  peer: { id: 1, type: 'user', key: 'u1' },
  type: 'user',
  title: 'Nikita 👨‍💻',
  userName: 'gusnkt',
  avatar: 'https://avatars3.githubusercontent.com/u/3505878',
  placeholder: 'red'
};

const oleg = {
  peer: { id: 2, type: 'user', key: 'u2' },
  type: 'user',
  title: 'Oleg',
  userName: 'olegshilov',
  avatar: 'https://avatars3.githubusercontent.com/u/930121',
  placeholder: 'green'
};

const group = {
  peer: { id: 3, type: 'group', key: 'g3' },
  type: 'group',
  title: 'Dialog Web 🤦🏽‍♂️🤦‍♂️',
  userName: null,
  placeholder: 'lblue'
};

const group2 = {
  peer: { id: 6, type: 'group', key: 'g6' },
  type: 'group',
  title: 'Dialog Web',
  userName: null,
  placeholder: 'lblue'
};

const publicGroup = {
  peer: { id: 4, type: 'group', key: 'g4' },
  type: 'group',
  title: 'Dialog OpenSource',
  userName: 'dlgoss',
  placeholder: 'blue'
};

const channel = {
  peer: { id: 5, type: 'group', key: 'g5' },
  type: 'channel',
  title: 'Dialog News',
  userName: 'dlgnews',
  placeholder: 'green'
};

const text = 'Lorem ipsum dolor sit amet, consectetur.';

initialState = {
  current: null
};

function handleSelect(peer) {
  setState({ current: peer.key });
  console.debug(peer.key);
}

<div style={{ width: 300, background: '#f5f5f5' }}>
  <SidebarRecentItem
    uid={1}
    info={nkt}
    active={nkt.peer.key === state.current}
    counter={0}
    favourite={true}
    message={{ sender: nkt, content: { type: 'text', text: '-----BEGIN RSA PRIVATE KEY-----' } }}
    online={true}
    onSelect={handleSelect}
  />
  <SidebarRecentItem
    uid={2}
    info={oleg}
    active={oleg.peer.key === state.current}
    counter={0}
    typing="is typing"
    message={{ sender: oleg, content: { type: 'photo' } }}
    online={false}
    onSelect={handleSelect}
  />
  <SidebarRecentItem
    uid={3}
    info={group}
    active={group.peer.key === state.current}
    counter={3}
    favourite={true}
    message={{ sender: oleg, content: { type: 'service', text: 'Nikita added Oleg' } }}
    online={null}
    onSelect={handleSelect}
  />
  <SidebarRecentItem
    uid={4}
    info={publicGroup}
    active={publicGroup.peer.key === state.current}
    counter={0}
    message={{ sender: nkt, content: { type: 'text', text: `We've got another one star` } }}
    online={null}
    onSelect={handleSelect}
  />
  <SidebarRecentItem
    uid={5}
    info={channel}
    muted={true}
    active={channel.peer.key === state.current}
    counter={57}
    message={{ content: { type: 'text', text: 'Today we introducing fully featured' } }}
    online={null}
    onSelect={handleSelect}
  />
  <SidebarRecentItem
    uid={6}
    info={group2}
    draft="Today we introducing fully featured"
    active={group2.peer.key === state.current}
    counter={0}
    online={null}
    onSelect={handleSelect}
  />
  <SidebarRecentItem
    uid={7}
    info={channel}
    muted={true}
    active={channel.peer.key === state.current}
    counter={57}
    message={{ content: { type: 'text', text: '' }, attachment: { type: 'forward', from: null } }}
    online={null}
    onSelect={handleSelect}
  />
    <SidebarRecentItem
      uid={1}
      info={nkt}
      active={nkt.peer.key === state.current}
      counter={0}
      favourite={true}
      message={{ sender: nkt, content: { type: 'text', text: '' }, attachment: { type: 'forward', from: null }  }}
      online={true}
      onSelect={handleSelect}
    />
    <SidebarRecentItem
      uid={1}
      info={nkt}
      active={nkt.peer.key === state.current}
      counter={0}
      favourite={true}
      message={{ sender: nkt, content: { type: 'text', text: '' }, attachment: { type: 'reply', from: null }  }}
      online={true}
      onSelect={handleSelect}
    />
</div>
```
