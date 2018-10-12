/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import Recorder from 'opus-recorder';
import IconButton from '../IconButton/IconButton';
import TimeTimer from '../Timer/TimeTimer';
import classNames from 'classnames';
import styles from './VoiceRecorder.css';

type Props = {
  className?: string,
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
    this.recorder.onstart = this.startRecording;
    this.recorder.onstop = this.stopRecording;
    this.recorder.ondataavailable = this.saveRecord;
  }

  handleStart = () => {
    this.recorder.start();
  };

  handleStopClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const canSave = e.currentTarget.id === 'stopBtn';
    this.recorder.stop();
    this.setState({ canSave, isRecording: false, endTime: Date.now() });
  };

  startRecording = () => {
    this.setState({ isRecording: true, startTime: Date.now() });
  };

  stopRecording = () => {
    const { onStop } = this.props;

    if (onStop) {
      onStop();
    }
  };

  saveRecord = (buffer: Uint8Array) => {
    const { onSave } = this.props;
    const { canSave } = this.state;

    if (canSave && onSave) {
      const { startTime, endTime } = this.state;
      const duration = endTime - startTime;
      const blob = new Blob([buffer], { type: 'audio/ogg' });
      onSave({ blob, duration });
    }
  };

  renderControls() {
    const { startTime } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.controlsWrapper}>
          <div className={styles.backdrop} onClick={this.handleStopClick} />
          <div className={styles.controls}>
            <IconButton
              id="cancelBtn"
              glyph="close"
              size="small"
              theme="danger"
              flat
              onClick={this.handleStopClick}
            />
            <div className={styles.timer}>
              <span className={styles.timerCircle} />
              <TimeTimer start={startTime} className={styles.timerDigits} />
            </div>
            <IconButton
              id="stopBtn"
              glyph="done"
              size="small"
              theme="success"
              flat
              onClick={this.handleStopClick}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isRecording } = this.state;

    return isRecording ? this.renderControls() : null;
  }
}

export default VoiceRecorder;
