/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import MediaRecorder from 'audio-recorder-polyfill';
import IconButton from '../IconButton/IconButton';
import TimeTimer from '../Timer/TimeTimer';
import classNames from 'classnames';
import styles from './VoiceRecorder.css';

type Props = {
  className?: string,
  onStop?: () => void,
  onCancel?: () => void,
  onSave: (Object) => void
};

type State = {
  startTime: number,
  endTime: number,
  canSave: boolean,
  isRecording: boolean
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
      startTime: 0,
      endTime: 0,
      canSave: false,
      isRecording: false
    };
  }

  componentWillUnmount() {
    this.recorder.removeEventListener('dataavailable', this.handleSave);
  }

  handleSave = (e: Event) => {
    const { onSave } = this.props;
    const { canSave, startTime, endTime } = this.state;

    if (canSave && onSave) {
      const duration = endTime - startTime;
      onSave({ blob: e.data, duration });
    }
  };

  handleStopClick = () => {
    const { onStop } = this.props;

    this.stopRecording();
    this.setState({ canSave: true, isRecording: false, endTime: Date.now() });

    if (onStop) {
      onStop();
    }
  };

  handleCancelClick = () => {
    const { onCancel } = this.props;

    this.stopRecording();
    this.setState({ canSave: false, isRecording: false });

    if (onCancel) {
      onCancel();
    }
  };

  startRecording = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', this.handleSave);
        this.recorder.start();
        this.setState({ isRecording: true, startTime: Date.now() });
      });
    }
  };

  stopRecording = () => {
    this.recorder.stop();
    this.recorder.stream.getTracks()[0].stop();
  };

  renderControls() {
    const { startTime } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.controlsWrapper}>
          <div className={styles.backdrop} onClick={this.handleCancelClick} />
          <div className={styles.controls}>
            <IconButton
              glyph="close"
              size="small"
              theme="danger"
              flat
              onClick={this.handleCancelClick}
            />
            <div className={styles.timer}>
              <span className={styles.timerCircle} />
              <TimeTimer start={startTime} className={styles.timerDigits} />
            </div>
            <IconButton
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
