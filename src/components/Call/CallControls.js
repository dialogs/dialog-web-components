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
        glyph={props.small ? 'aspect_ratio' : 'picture_in_picture'}
        className={styles.controlButton}
        onClick={props.onSizeToggle}
      />
      <IconButton
        flat
        size={size}
        theme={isIncomming ? 'danger' : 'success'}
        glyph={isIncomming ? 'call_end' : 'call'}
        className={styles.controlButton}
        onClick={isIncomming ? props.onEnd : props.onAnswer}
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
