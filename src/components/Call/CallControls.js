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

  return (
    <div className={className}>
      <IconButton
        flat
        glyph={props.small ? 'aspect_ratio' : 'picture_in_picture'}
        size={size}
        className={styles.controlButton}
        onClick={props.onSizeToggle}
      />
      <IconButton
        flat
        theme="danger"
        glyph="call_end"
        size={size}
        className={styles.controlButton}
        onClick={props.onEnd}
      />
      <IconButton
        flat
        theme="primary"
        glyph={props.isMuted ? 'mic_off' : 'mic'}
        size={size}
        className={styles.controlButton}
        onClick={props.onMuteToggle}
      />
    </div>
  );
}

export default CallControls;
