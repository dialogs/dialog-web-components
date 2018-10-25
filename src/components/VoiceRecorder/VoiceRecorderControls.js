/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import IconButton from '../IconButton/IconButton';
import TimeTimer from '../Timer/TimeTimer';
import styles from './VoiceRecorderControls.css';

type Props = {
  className?: string,
  startTime: number,
  onStop: () => void,
  onCancel: () => void
};

class VoiceRecorderControls extends PureComponent<Props> {
  render() {
    const { className, startTime, onStop, onCancel } = this.props;

    return (
      <div className={className}>
        <div className={styles.backdrop} onClick={onCancel} />
        <div className={styles.controls}>
          <IconButton
            glyph="close"
            size="small"
            theme="danger"
            flat
            onClick={onCancel}
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
            onClick={onStop}
          />
        </div>
      </div>
    );
  }
}

export default VoiceRecorderControls;
