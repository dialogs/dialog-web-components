/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { Component } from 'react';
import Recorder from 'opus-recorder';

type Props = {
  children: Function,
  onStop?: () => void,
  onSave: (Object) => void
};

type State = {
  startTime: number,
  endTime: number,
  canSave: boolean,
  isRecording: boolean
};

const options = {
  monitorGain: 0,
  recordingGain: 1,
  numberOfChannels: 1,
  encoderSampleRate: 48000,
  encoderPath: '/devapp/encoderWorker.min.js'
};

class VoiceRecorder extends Component<Props, State> {
  recorder: Recorder;

  constructor(props: Props) {
    super(props);

    this.state = {
      startTime: 0,
      endTime: 0,
      canSave: false,
      isRecording: false
    };

    this.recorder = new Recorder(options);
    this.recorder.onstart = this.handleStart;
    this.recorder.onstop = this.handleStop;
    this.recorder.ondataavailable = this.handleSave;
  }

  handleStart = () => {
    this.setState({ isRecording: true, startTime: Date.now() });
  };

  handleStop = () => {
    const { onStop } = this.props;

    if (onStop) {
      onStop();
    }
  };

  handleSave = (buffer: Uint8Array) => {
    const { onSave } = this.props;
    const { canSave } = this.state;

    if (canSave && onSave) {
      const { startTime, endTime } = this.state;
      const duration = endTime - startTime;
      const blob = new Blob([buffer], { type: 'audio/ogg' });
      onSave({ blob, duration });
    }
  };

  startRecording = () => {
    this.recorder.start();
  };

  stopRecording = () => {
    this.recorder.stop();
    this.setState({ canSave: true, isRecording: false, endTime: Date.now() });
  };

  cancelRecording = () => {
    this.recorder.stop();
    this.setState({ canSave: false, isRecording: false, endTime: Date.now() });
  };

  render() {
    const { isRecording, startTime } = this.state;
    const recordProps = {
      isRecording,
      startTime,
      startRecording: this.startRecording,
      stopRecording: this.stopRecording,
      cancelRecording: this.cancelRecording,
    };

    return (
      this.props.children(recordProps)
    );
  }
}

export default VoiceRecorder;
