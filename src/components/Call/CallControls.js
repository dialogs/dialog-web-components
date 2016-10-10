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

  const isIncomming = !props.isOutgoing && props.state === 'calling';

  return (
    <div className={className}>
      <IconButton
        flat
        size={size}
        glyph={props.small ? 'aspect_ratio' : 'minimize'}
        className={styles.controlButton}
        onClick={props.onSizeToggle}
      />
      <IconButton
        flat
        size={size}
        theme={isIncomming ? 'success' : 'danger'}
        glyph={isIncomming ? 'call' : 'call_end'}
        className={styles.controlButton}
        onClick={isIncomming ? props.onAnswer : props.onEnd}
      />
      <IconButton
        flat
        size={size}
        theme="primary"
        glyph={props.isMuted ? 'mic_off' : 'mic'}
        className={styles.controlButton}
        onClick={props.onMuteToggle}
      />
    </div>
  );
}

export default CallControls;
