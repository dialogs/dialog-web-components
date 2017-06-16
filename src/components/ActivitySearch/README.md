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
    focus: {
      ...messages[4],
      sender: null
    },
    after: []
}];

initialState = {
  query: 'Test query',
  result: {
    pending: false,
    error: null,
    value: []
  }
};

const togglePending = () => {
  setState({
    result: {
      ...state.result,
      pending: state.result.pending ? false : true
    }
  });
};

const toggleError = () => {
  console.debug('toggleError', state);
  setState({
    result: {
      ...state.result,
      error: state.result.error ? null : {
        message: 'Something went wrong'
      }
    }
  });
};

const toggleResults = () => {
  console.debug('toggleResults', state);
  setState({
    result: {
      ...state.result,
      value: state.result.value.length ? [] : results
    }
  });
};

<div>
  <div className="styleguide__buttons">
    <Button onClick={togglePending} size="small" theme="primary" style={{ marginRight: 4 }}>Toggle Pending</Button>
    <Button onClick={toggleError} size="small" theme="primary" style={{ marginRight: 4 }}>Toggle Error</Button>
    <Button onClick={toggleResults} size="small" theme="primary" style={{ marginRight: 4 }}>Toggle Results</Button>
  </div>
  <div style={{ background: '#fff', width: 320, height: 400 }}>
    <ActivitySearch
      query={state.query}
      result={state.result}
      onClose={() => {console.debug('Close search')}}
    />
  </div>
</div>
```
