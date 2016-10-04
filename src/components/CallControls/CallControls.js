/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from '../Call/Call.css';

export type CallControlsProps = {
  small: boolean,
  onMinimize: Function,
  onCallEnd: Function,
  onCallMute: Function,
};

function CallControls(props: CallControlsProps): React.Element<any> {
  const className = classNames(styles.control, {
    [styles.smallControl]: props.small
  });
  const buttonSize = props.small ? 'normal' : 'large';

  return (
    <div className={className}>
      <IconButton
        glyph="compare_arrows"
        size={buttonSize}
        flat
        className={styles.controlButton}
        onClick={props.onMinimize}
      />
      <IconButton
        glyph="call_end"
        size={buttonSize}
        flat
        className={styles.controlButton}
        onClick={props.onCallEnd}
      />
      <IconButton
        glyph="mic_off"
        size={buttonSize}
        flat
        className={styles.controlButton}
        onClick={props.onCallMute}
      />
    </div>
  );
}

export default CallControls;
