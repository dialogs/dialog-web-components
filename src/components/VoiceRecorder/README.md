Voice Recorder

```jsx
const { default: AudioPlayer } = require('../AudioPlayer/AudioPlayer');
const { default: VoiceRecorderControls } = require('../VoiceRecorder/VoiceRecorderControls');

const initialState = {
  hasFinishedRecording: false,
  duration: 0,
};

handleSaveRecord = (record) => {
  const recordUrl = URL.createObjectURL(record.blob);
  setState({ recordUrl, duration: record.duration });
};

<div style={{ position: 'relative', minHeight: 90 }}>
  <VoiceRecorder
    onSave={this.handleSaveRecord}
  >
    {({ isRecording, startTime, startRecording, stopRecording, cancelRecording }) => (
      <div>
        { isRecording ?
          <VoiceRecorderControls
            startTime={startTime}
            onStop={stopRecording}
            onCancel={cancelRecording}
          /> :
          <Button theme="primary" size="small" onClick={startRecording}>Start recording</Button>
        }
      </div>
    )}
  </VoiceRecorder>
  <div style={{ marginTop: 10 }}>
    <AudioPlayer src={state.recordUrl} duration={state.duration} />
  </div>
</div>
```
