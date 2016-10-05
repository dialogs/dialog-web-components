Call:

```
const initialState = {
  call: null,
  small: false,
  duration: 0,
  timerId: null
};

const call = {
  state: 'calling',
  peer: {
    id: 1,
    type: 'user'
  },
  caller: {
    id: 1,
    name: 'Nikita',
    placeholder: 'red',
    avatar: 'https://avatars0.githubusercontent.com/u/3505878'
  },
  members: [],
  isMuted: false,
  isOutgoing: false
};

const handleCall = () => {
  setState({ call });
  setTimeout(handleConnect, 3000);
};

const handleConnect = () => {
  setState({
    call: {
      ...call,
      state: 'connecting'
    }
  });

  setTimeout(handleInProgress, 1000);
};

const handleInProgress = () => {
  let duration = 0;
  const timerId = setInterval(() => {
    setState({ duration: duration++ });
  }, 1000);

  setState({
    timerId,
    duration,
    call: {
      ...call,
      state: 'in_progress'
    }
  });
};

const handleEnd = () => {
  if (state.timerId) {
    clearInterval(state.timerId);
  }

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
  <Button onClick={handleCall}>Call</Button>

  <Call
    call={state.call}
    small={state.small}
    duration={state.duration}
    onEnd={handleEnd}
    onSizeToggle={handleSizeToggle}
    onMuteToggle={handleMuteToggle}
  />
</div>
```
