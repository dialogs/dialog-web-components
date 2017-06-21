```
const messages = require('../../fixtures/messages');
const peerInfo = require('../../fixtures/peerInfo');

const searchMessages = [{
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
    focus: {
      ...messages[4],
      sender: null
    },
    after: []
}];

initialState = {
  query: 'Test query',
  peers: [],
  messages: {
    pending: false,
    error: null,
    value: []
  }
};

const togglePending = () => {
  setState({
    messages: {
      ...state.messages,
      pending: state.messages.pending ? false : true
    }
  });
};

const toggleError = () => {
  console.debug('toggleError', state);
  setState({
    messages: {
      ...state.messages,
      error: state.messages.error ? null : new Error('Something went wrong')
    }
  });
};

const toggleResults = () => {
  console.debug('toggleMessages', state);
  setState({
    peers: [peerInfo, messages[0].sender],
    messages: {
      ...state.messages,
      value: state.messages.value.length ? [] : searchMessages
    }
  });
};

const onGoToPeer = (peer) => console.debug('onGoToPeer', { peer });

<div>
  <div className="styleguide__buttons">
    <Button onClick={togglePending} size="small" theme="primary" style={{ marginRight: 4 }}>Toggle Pending</Button>
    <Button onClick={toggleError} size="small" theme="primary" style={{ marginRight: 4 }}>Toggle Error</Button>
    <Button onClick={toggleResults} size="small" theme="primary" style={{ marginRight: 4 }}>Toggle Results</Button>
  </div>
  <div style={{ background: '#fff', width: 320, height: 400 }}>
    <ActivitySearch
      query={state.query}
      peers={state.peers}
      messages={state.messages}
      onClose={() => console.debug('Close search')}
      onGoToPeer={(peer) => console.debug('Go to peer', peer)}
      onGoToMessage={(peer, message) => console.debug('Go to message', peer, message)}
    />
  </div>
</div>
```
