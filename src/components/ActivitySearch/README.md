```
const messages = require('../../fixtures/messages');
const peerInfo = require('../../fixtures/peerInfo');
const results = [{
    info: peerInfo,
    messages: messages,
    focus: messages[2].rid,
    highlight: [[0, 5]]
},{
    info: peerInfo,
    messages: messages,
    focus: messages[1].rid,
    highlight: [[10, 15]]
}];

<div style={{ background: '#fff', width: 320 }}>
  <ActivitySearch
    onClose={() => {console.debug('Close search')}}
    results={results}
  />
</div>
```
