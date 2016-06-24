import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Modal.css';
import ReactModal from 'react-modal';

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    fullscreen: PropTypes.bool,
    onClose: PropTypes.func.isRequired
  };

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
        <div className={styles.container}>{children}</div>
      </ReactModal>
    );
  }
}

export default Modal;
