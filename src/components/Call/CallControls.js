/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallControlsProps } from './types';
import React from 'react';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from './CallControls.css';

function CallControls(props: CallControlsProps): React.Element<any> {
  const size = 'normal';
  const className = classNames(styles.container, {
    [styles.small]: props.small,
    [styles.hide]: !props.isHover
  });

  const buttons = [];

  if (props.state === 'ringing_incoming') {
    buttons.push(
      <IconButton
        flat
        key="answer"
        size={size}
        theme="success"
        glyph="call"
        className={styles.button}
        onClick={props.onAnswer}
      />
    );
  }

  buttons.push(
    <IconButton
      flat
      key="end"
      size={size}
      theme="danger"
      glyph="call_end"
      className={styles.button}
      onClick={props.onEnd}
    />
  );

  buttons.push(
    <IconButton
      flat
      key="mic"
      size={size}
      theme="primary"
      glyph={props.isMuted ? 'mic_material_off' : 'mic_material'}
      className={styles.button}
      onClick={props.onMuteToggle}
    />
  );

  if (!props.small) {
    buttons.push(
      <IconButton
        flat
        key="camera"
        size={size}
        theme="info"
        glyph={props.isCameraOn ? 'videocam_off' : 'videocam'}
        className={styles.button}
        onClick={props.onCameraToggle}
      />
    );
  }

  return (
    <div className={className}>
      {buttons}
    </div>
  );
}

export default CallControls;
