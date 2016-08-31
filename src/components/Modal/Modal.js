/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    fullscreen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    fullscreen: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isOpen !== this.props.isOpen ||
           nextProps.children !== this.props.children ||
           nextProps.fullscreen !== this.props.fullscreen ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { children, isOpen, fullscreen, onClose } = this.props;
    const className = classNames(styles.root, this.props.className);
    const overlayClassName = classNames(styles.overlay, {
      [styles.fullscreen]: fullscreen
    });

    return (
      <ReactModal
        overlayClassName={overlayClassName}
        className={className}
        onRequestClose={onClose}
        isOpen={isOpen}
      >
        <div className={styles.wrapper}>
          {children}
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
