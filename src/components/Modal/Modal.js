/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';

export type Props = {
  className?: string,
  overlayClassName?: string,
  children?: Node,
  fullscreen?: boolean,
  shouldCloseOnOverlayClick?: boolean,
  onClose?: () => mixed
};

class Modal extends PureComponent<Props> {
  render() {
    const className = classNames(styles.container, this.props.className);
    const overlayClassName = classNames(styles.overlay, this.props.overlayClassName, {
      [styles.fullscreen]: this.props.fullscreen
    });

    return (
      <ReactModal
        isOpen
        className={className}
        overlayClassName={overlayClassName}
        onRequestClose={this.props.onClose}
        shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
        contentLabel=""
        ariaHideApp={false}
      >
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </ReactModal>
    );
  }
}


export default Modal;
