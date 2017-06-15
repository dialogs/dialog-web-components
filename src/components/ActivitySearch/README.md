```
const messages = require('../../fixtures/messages');
const peerInfo = require('../../fixtures/peerInfo');
const results = [{
    info: peerInfo,
    before: [messages[0]],
    focus: messages[1],
    after: [messages[2]]
},{
    info: peerInfo,
    before: [messages[1], messages[2]],
    focus: messages[3],
    after: [messages[4]]
},{
    info: peerInfo,
    before: [],
    focus: messages[3],
    after: []
}];

<div style={{ background: '#fff', width: 320, height: 400 }}>
  <ActivitySearch
    onClose={() => {console.debug('Close search')}}
    results={results}
  />
</div>
```
