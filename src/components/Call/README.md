Call:

```
const initialState = {
  id: 1,
  call: null,
  caller: null,
  small: false,
  duration: 0
};

const call = {
  state: 'calling',
  peer: {
    id: 1,
    type: 'user'
  },
  members: [],
  isMuted: false,
  isOutgoing: false
};

const caller = {
  id: 1,
  name: 'Nikita',
  placeholder: 'red',
  avatar: 'https://avatars0.githubusercontent.com/u/3505878'
};

const handleCall = () => {
  setState({ call, caller });
  setTimeout(handleConnect, 3000);
};

const handleConnect = () => {
  setState({
    call: {
      ...call,
      state: 'connecting'
    }
  });
};

const handleInProgress = () => {
  setState({
    duration,
    call: {
      ...call,
      state: 'in_progress'
    }
  });
};

const handleAnswer = () => {
  setTimeout(handleInProgress, 1000);
};

const handleEnd = () => {
  setState(initialState);
};

const handleSizeToggle = () => {
  setState({ small: !state.small });
};

const handleMuteToggle = () => {
  setState({
    call: {
      ...state.call,
      isMuted: !state.call.isMuted
    }
  });
};

<div>
  <Button onClick={handleCall} theme="primary">Call</Button>

  <Call
    id={state.id}
    call={state.call}
    caller={state.caller}
    small={state.small}
    onEnd={handleEnd}
    onAnswer={handleAnswer}
    onSizeToggle={handleSizeToggle}
    onMuteToggle={handleMuteToggle}
  />
</div>
```
