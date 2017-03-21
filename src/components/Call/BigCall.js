/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import CallAvatar from './CallAvatar';
import CallControls from './CallControls';
import CallInfo from './CallInfo';
import styles from './Call.css';

function BigCall(props: CallProps) {
  const className = classNames(styles.container, props.className);

  return (
    <Modal className={className} onClose={props.onSizeToggle}>
      <ModalBody className={styles.body}>
        <CallAvatar caller={props.caller} />
        <CallInfo
          small={false}
          call={props.call}
          caller={props.caller}
          duration={props.duration}
        />
        <CallControls
          small={false}
          state={props.call.state}
          isMuted={props.call.isMuted}
          onEnd={props.onEnd}
          onAnswer={props.onAnswer}
          onSizeToggle={props.onSizeToggle}
          onMuteToggle={props.onMuteToggle}
        />
      </ModalBody>
    </Modal>
  );
}

export default BigCall;
