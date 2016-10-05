/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import CallInfo from './CallInfo';
import CallControls from './CallControls';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './Call.css';

function SmallCall(props: CallProps) {
  const className = classNames(styles.container, styles.small, props.className);

  return (
    <Draggable>
      <div className={className}>
        <div className={styles.smallInfoWrapper}>
          <PeerAvatar size="large" peer={props.caller} className={styles.smallInfoAvatar} />
          <CallInfo
            small
            call={props.call}
            caller={props.caller}
            duration={props.duration}
          />
        </div>
        <CallControls
          small
          isMuted={props.call.isMuted}
          onEnd={props.onEnd}
          onSizeToggle={props.onSizeToggle}
          onMuteToggle={props.onMuteToggle}
        />
      </div>
    </Draggable>
  );
}

export default SmallCall;
