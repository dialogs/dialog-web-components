```
const messages = require('../../fixtures/messages');
const peerInfo = require('../../fixtures/peerInfo');
const results = [{
    info: peerInfo,
    before: [messages[0]],
    focus: messages[1],
    after: [messages[2]],
}];

<div style={{ background: '#fff', width: 320 }}>
  <ActivitySearch
    onClose={() => {console.debug('Close search')}}
    results={results}
  />
</div>
```
