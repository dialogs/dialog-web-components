Full Recent Item:

```
const nkt = {
  peer: { id: 1, type: 'user', key: 'u1' },
  type: 'user',
  title: 'Nikita',
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
  peer: { id: 1, type: 'group', key: 'g1' },
  type: 'group',
  title: 'Dialog Web',
  userName: null,
  placeholder: 'lblue'
};

const publicGroup = {
  peer: { id: 2, type: 'group', key: 'g2' },
  type: 'group',
  title: 'Dialog OpenSource',
  userName: 'dlgoss',
  placeholder: 'blue'
};

const channel = {
  peer: { id: 3, type: 'group', key: 'g3' },
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
}

<div style={{ width: 300, background: '#f5f5f5' }}>
  <FullRecentItem
    uid={1}
    info={nkt}
    active={nkt.peer.key === state.current}
    counter={0}
    favourite={true}
    message={{ sender: nkt, content: { type: 'text', text: '-----BEGIN RSA PRIVATE KEY-----' } }}
    online={true}
    onSelect={handleSelect}
  />
  <FullRecentItem
    uid={1}
    info={oleg}
    active={oleg.peer.key === state.current}
    counter={0}
    typing="is typing"
    message={{ sender: oleg, content: { type: 'photo' } }}
    online={false}
    onSelect={handleSelect}
  />
  <FullRecentItem
    uid={1}
    info={group}
    active={group.peer.key === state.current}
    counter={3}
    favourite={true}
    message={{ sender: oleg, content: { type: 'service', text: 'Nikita added Oleg' } }}
    online={null}
    onSelect={handleSelect}
  />
  <FullRecentItem
    uid={1}
    info={publicGroup}
    active={publicGroup.peer.key === state.current}
    counter={0}
    message={{ sender: nkt, content: { type: 'text', text: `We've got another one star` } }}
    online={null}
    onSelect={handleSelect}
  />
  <FullRecentItem
    uid={1}
    info={channel}
    muted={true}
    active={channel.peer.key === state.current}
    counter={57}
    message={{ content: { type: 'text', text: 'Today we introducing fully featured' } }}
    online={null}
    onSelect={handleSelect}
  />
</div>
```
