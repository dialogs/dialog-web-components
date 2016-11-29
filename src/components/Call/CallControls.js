/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallControlsProps } from './types';
import React from 'react';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from './Call.css';

function CallControls(props: CallControlsProps): React.Element<any> {
  const size = props.small ? 'normal' : 'large';
  const className = classNames(styles.control, {
    [styles.smallControl]: props.small
  });

  const buttons = [];
  buttons.push(
    <IconButton
      flat
      key="size"
      size={size}
      glyph={props.small ? 'aspect_ratio' : 'minimize'}
      className={styles.controlButton}
      onClick={props.onSizeToggle}
    />
  );

  // incomming
  if (!props.isOutgoing && props.state === 'calling') {
    buttons.push(
      <IconButton
        flat
        key="end"
        size={size}
        theme="success"
        glyph="call"
        className={styles.controlButton}
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
      className={styles.controlButton}
      onClick={props.onEnd}
    />
  );

  buttons.push(
    <IconButton
      flat
      key="mic"
      size={size}
      theme="primary"
      glyph={props.isMuted ? 'mic_off' : 'mic'}
      className={styles.controlButton}
      onClick={props.onMuteToggle}
    />
  );

  return (
    <div className={className}>
      {buttons}
    </div>
  );
}

export default CallControls;
