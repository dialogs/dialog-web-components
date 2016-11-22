/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';

export type Props = {
  className?: string,
  children?: any,
  fullscreen?: boolean,
  shouldCloseOnOverlayClick?: boolean,
  onClose: () => any
};

function Modal(props: Props) {
  const className = classNames(styles.container, props.className);
  const overlayClassName = classNames(styles.overlay, {
    [styles.fullscreen]: props.fullscreen
  });

  return (
    <ReactModal
      isOpen
      className={className}
      overlayClassName={overlayClassName}
      onRequestClose={props.onClose}
      shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick || true}
    >
      <div className={styles.wrapper}>
        {props.children}
      </div>
    </ReactModal>
  );
}

export default Modal;
