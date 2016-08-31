/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import Button from '../Button/Button';
import styles from './Modal.css';

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    header: PropTypes.node,
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
           nextProps.header !== this.props.header ||
           nextProps.fullscreen !== this.props.fullscreen ||
           nextProps.className !== this.props.className;
  }

  renderModalHeader() {
    const { fullscreen, header, onClose } = this.props;
    if (fullscreen) {
      return (
        <div>
          <Button
            onClick={onClose}
            size="small"
            className={styles.close}
          >
            Close
          </Button>
          <header className={styles.header}>
            <h3 className={styles.title}>{header}</h3>
          </header>
        </div>
      );
    }

    return (
      <div>
        <header className={styles.header}>
          <h3 className={styles.title}>{header}</h3>
          <Button
            onClick={onClose}
            size="small"
            className={styles.close}
          >
            Close
          </Button>
        </header>
      </div>
    );
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
          {this.renderModalHeader()}
          <div className={styles.body}>
            {children}
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
