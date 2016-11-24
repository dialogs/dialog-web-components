/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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
    const { keyMap, handlers } = this.props;
    const content = (
      <div className={styles.wrapper}>
        {this.props.children}
      </div>
    );

    if (keyMap && handlers) {
      return (
        <HotKeys keyMap={keyMap} handlers={handlers} focused attach={window}>
          {content}
        </HotKeys>
      );
    }

    return content;
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
      >
        {this.renderContent()}
      </ReactModal>
    );
  }
}


export default Modal;
