/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import MediaRecorder from 'audio-recorder-polyfill';
import RecordButton from './RecordButton';
import StopButton from './StopButton';
import CancelButton from './CancelButton';
import TimeTimer from '../Timer/TimeTimer';
import classNames from 'classnames';
import styles from './VoiceRecorder.css';

type Props = {
  className?: string,
  onSave?: (Object) => void,
};

type State = {
  canSave: boolean,
  isRecording: boolean,
  startTime: number,
  duration: number,
};

type Event = {
  data: Blob
};

const constraints = { audio: true };

class VoiceRecorder extends Component<Props, State> {
  recorder: MediaRecorder;

  constructor(props: Props) {
    super(props);

    this.state = {
      canSave: false,
      isRecording: false,
      startTime: 0,
      duration: 0
    };
  }

  componentWillUnmount() {
    this.recorder.removeEventListener('dataavailable', this.handleSave);
  }

  handleSave = (e: Event) => {
    const { onSave } = this.props;
    const { canSave, duration } = this.state;
    const recordData = { blob: e.data, duration };

    if (canSave && onSave) {
      onSave(recordData);
    }
  };

  handleStartClick = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', this.handleSave);
        this.recorder.start();
        this.setState({ isRecording: true, startTime: Date.now() });
      });
    }
  }

  handleStopClick = () => {
    const { startTime } = this.state;
    this.stopRecording();

    const duration = Date.now() - startTime;
    this.setState({ canSave: true, isRecording: false, duration });
  };

  handleCancelClick = () => {
    this.stopRecording();
    this.setState({ canSave: false, isRecording: false });
  };

  stopRecording = () => {
    this.recorder.stop();
    this.recorder.stream.getTracks()[0].stop();
  };

  renderRecordButton = () => (
    <RecordButton onClick={this.handleStartClick} />
  );

  renderControls() {
    const { startTime } = this.state;

    return (
      <div className={styles.controlsWrapper}>
        <div className={styles.backdrop} onClick={this.handleCancelClick} />
        <div className={styles.controls}>
          <CancelButton onClick={this.handleCancelClick} />
          <div className={styles.timer}>
            <span className={styles.timerCircle} />
            <TimeTimer start={startTime} className={styles.timerDigits} />
          </div>
          <StopButton onClick={this.handleStopClick} />
        </div>
      </div>
    );
  }

  render() {
    const { isRecording } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        { isRecording ? this.renderControls() : this.renderRecordButton() }
      </div>
    );
  }
}

export default VoiceRecorder;
