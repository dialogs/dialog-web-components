import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';
import Button from '../Button/Button';

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    fullscreen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.node
  };

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
        <div className={styles.container}>
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
