/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
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

class Modal extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);
    const overlayClassName = classNames(styles.overlay, {
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
      >
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </ReactModal>
    );
  }
}


export default Modal;
