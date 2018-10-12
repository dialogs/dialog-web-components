Voice Recorder

```jsx
const { default: AudioPlayer } = require('../AudioPlayer/AudioPlayer');

const initialState = {
  isRecording: false,
  hasFinishedRecording: false,
  recordUrl: '',
  duration: 0,
};

handleSave = (record) => {
  const recordUrl = URL.createObjectURL(record.blob);
  setState({ recordUrl, duration: record.duration });
};

handleStart = () => {
  setState({ isRecording: true, hasFinishedRecording: false }, () => {
    voiceRecorder.handleStart();
  });
};

handleStop = () => {
  setState({ isRecording: false, hasFinishedRecording: true });
};

<div style={{ position: 'relative', minHeight: 100 }}>
  {!state.isRecording &&
    <Button theme="primary" size="small" onClick={handleStart}>Start recording</Button>}
  {state.isRecording && <VoiceRecorder ref={(recorderNode) => voiceRecorder = recorderNode} onStop={handleStop} onSave={handleSave} />}
  {state.hasFinishedRecording &&
    <div style={{ marginTop: 10 }}>
      <AudioPlayer src={state.recordUrl} duration={state.duration} />
    </div>
  }
</div>
```
