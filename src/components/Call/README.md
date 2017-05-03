```
initialState = {
  id: 1,
  call: null,
  caller: null,
  small: false,
  duration: 0
};

const call = {
  state: 'ringing_outgoing',
  peer: {
    id: 1,
    type: 'user'
  },
  members: [],
  isMuted: false,
  isCameraOn: false,
  ownVideos: [
    <video src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.ogg" autoPlay />
  ],
  theirVideos:[
    <video src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.ogg" autoPlay />
  ]
};

const caller = {
  id: 1,
  name: 'Nikita',
  placeholder: 'red',
  avatar: 'https://avatars0.githubusercontent.com/u/3505878'
};

let interval = null;

const handleConnect = () => {
  setState({
    call: {
      ...call,
      state: 'connecting'
    }
  });
  interval = setInterval(handleInProgress, 1000);
};

const handleInProgress = () => {
  setState({
    duration: state.duration++,
    call: {
      ...call,
      state: 'in_progress'
    }
  });
};


const handleCall = () => {
  setState({ call, caller });
  //setTimeout(handleConnect, 4000);
};

const handleAnswer = () => {
  setTimeout(handleInProgress, 1000);
};

const handleEnd = () => {
  clearInterval(interval);
  setState({
    id: 1,
    call: null,
    caller: null,
    small: false,
    duration: 0
  });
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

const handleCameraToggle = () => {
  setState({
    call: {
      ...state.call,
      isCameraOn: !state.call.isCameraOn
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
    onCameraToggle={handleCameraToggle}
  />
</div>
```
