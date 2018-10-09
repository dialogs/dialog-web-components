/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import styles from './Modal.css';

export type Props = {
  className?: string,
  overlayClassName?: string,
  children?: Node,
  fullscreen?: boolean,
  shouldCloseOnOverlayClick?: boolean,
  onClose?: () => mixed
};

type ReactModalProps = {
  className?: string,
  overlayClassName?: string,
  onRequestClose?: () => mixed,
  shouldCloseOnOverlayClick: boolean,
  children: Node
};

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', '@dlghq/web-components/modal-root');
const body = document.querySelector('body');
if (body) {
  body.appendChild(modalRoot);
}

class ReactModal extends React.PureComponent<ReactModalProps> {
  static defaultProps = {
    shouldCloseOnOverlayClick: true
  };

  handleClickOverlay = () => {
    const { onRequestClose, shouldCloseOnOverlayClick } = this.props;

    if (shouldCloseOnOverlayClick && onRequestClose) {
      onRequestClose();
    }
  };

  handleInnerClick = (e) => {
    e.stopPropagation();
  };

  render() {
    const { children, overlayClassName, className } = this.props;

    return createPortal(
      <div className={overlayClassName} onClick={this.handleClickOverlay}>
        <div className={className} onClick={this.handleInnerClick}>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

class Modal extends PureComponent<Props> {
  render() {
    const className = classNames(styles.container, this.props.className);
    const overlayClassName = classNames(styles.overlay, this.props.overlayClassName, {
      [styles.fullscreen]: this.props.fullscreen
    });
    const { onClose, shouldCloseOnOverlayClick } = this.props;

    return (
      <ReactModal
        isOpen
        className={className}
        overlayClassName={overlayClassName}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        <div className={styles.wrapper}>{this.props.children}</div>
      </ReactModal>
    );
  }
}

export default Modal;
