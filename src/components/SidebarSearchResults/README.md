```jsx
const messages = require('../../fixtures/messages');
const peerInfo = require('../../fixtures/peerInfo');

const searchMessages = [
  {
    info: peerInfo.user,
    before: [messages[0]],
    focus: messages[1],
    after: [messages[2]],
  },
  {
    info: peerInfo.channel,
    before: [messages[2], messages[1]],
    focus: messages[3],
    after: [messages[4]],
  },
  {
    info: peerInfo.bot,
    before: [],
    focus: {
      ...messages[4],
    },
    after: [],
  },
];

initialState = {
  query: 'Test query',
  peers: [],
  messages: {
    pending: false,
    error: null,
    value: [],
  },
};

const togglePending = () => {
  setState({
    messages: {
      ...state.messages,
      pending: !state.messages.pending,
    },
  });
};

const toggleError = () => {
  console.debug('toggleError', state);
  setState({
    messages: {
      ...state.messages,
      error: state.messages.error ? null : new Error('Something went wrong'),
    },
  });
};

const toggleResults = () => {
  console.debug('toggleMessages', state);
  setState({
    query: 'testQuery',
    peers: [peerInfo.bot, messages[0].sender],
    messages: {
      ...state.messages,
      value: state.messages.value.length ? [] : searchMessages,
    },
  });
};

const toggleShortQuery = () => {
  setState({
    query: '1',
  });
};

const onGoToPeer = (peer) => console.debug('onGoToPeer', { peer });

<div>
  <div className="styleguide__searchResultsButtons">
    <Button onClick={togglePending} size="small" theme="primary">
      Toggle Pending
    </Button>
    <Button onClick={toggleError} size="small" theme="primary">
      Toggle Error
    </Button>
    <Button onClick={toggleResults} size="small" theme="primary">
      Toggle Results
    </Button>
    <Button onClick={toggleShortQuery} size="small" theme="primary">
      Toggle Short Query
    </Button>
  </div>
  <div
    style={{
      width: 270,
      background: '#f5f5f5',
      height: 500,
      position: 'relative',
      display: 'flex',
    }}
  >
    <SidebarSearchResults
      query={state.query}
      peers={state.peers}
      messages={state.messages}
      minQueryLength={3}
      onGoToPeer={(peer) => alert('Go to peer')}
      onGoToMessage={(peer, message) => alert('Go to message')}
    />
  </div>
</div>;
```
