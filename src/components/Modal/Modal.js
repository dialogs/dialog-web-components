/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';
import { HotKeys } from 'react-hotkeys';

export type Props = {
  className?: string,
  children?: any,
  fullscreen?: boolean,
  shouldCloseOnOverlayClick?: boolean,
  keyMap?: Object,
  handlers?: Object,
  onClose: () => any
};

class Modal extends PureComponent {
  props: Props;

  renderContent() {
    const { keyMap, handlers, children } = this.props;

    if (keyMap && handlers) {
      return (
        <HotKeys
          className={styles.wrapper}
          keyMap={keyMap}
          handlers={handlers}
          focused
          attach={window}
        >
          {children}
        </HotKeys>
      );
    }

    return (
      <div className={styles.wrapper}>
        {children}
      </div>
    );
  }

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
        {this.renderContent()}
      </ReactModal>
    );
  }
}


export default Modal;
