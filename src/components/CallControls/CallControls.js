/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallState } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from './CallControls.css';

export type Props = {
  state: CallState,
  small: boolean,
  isMuted: boolean,
  isHover: boolean,
  isCameraOn: boolean,
  isScreenShareOn: boolean,
  onEnd: () => void,
  onAnswer: () => void,
  onMuteToggle: () => void,
  onCameraToggle: () => void,
  onScreenShareToggle: () => void,
  isVideoEnabled: boolean,
  isScreenSharingEnabled: boolean,
  isAudioCall: boolean,
  onSizeToggle: () => void
};

function CallControls(props: Props): React.Element<any> {
  const size = 'normal';
  const className = classNames(styles.container, {
    [styles.small]: props.small,
    [styles.audio]: props.isAudioCall,
    [styles.hide]: !props.isHover
  });

  const buttons = [];

  // if (props.isAudioCall) {
  //   buttons.push(
  //     <IconButton
  //       flat
  //       key="size"
  //       size={size}
  //       theme="default"
  //       glyph={props.small ? 'maximize' : 'minimize'}
  //       className={styles.button}
  //       onClick={props.onSizeToggle}
  //     />
  //   );
  // }

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

  if (!props.small && props.isVideoEnabled) {
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

  if (!props.small && props.isScreenSharingEnabled) {
    buttons.push(
      <IconButton
        flat
        key="screen_share"
        size={size}
        theme="info"
        glyph={props.isScreenShareOn ? 'screen_share_stop' : 'screen_share'}
        className={styles.button}
        onClick={props.onScreenShareToggle}
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
