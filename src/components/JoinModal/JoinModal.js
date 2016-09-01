/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './JoinModal.css';

class JoinModal extends Component {
  static propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    groupTitle: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onJoin: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.groupTitle !== this.props.groupTitle ||
           nextProps.className !== this.props.className ||
           nextProps.isOpen !== this.props.isOpen ||
           nextProps.onClose !== this.props.onClose ||
           nextProps.onJoin !== this.props.onJoin;
  }

  render() {
    const { groupTitle, isOpen, onClose, onJoin, className } = this.props;
    const joinClassName = classNames(styles.root, className);

    return (
      <Modal isOpen={isOpen} onClose={onClose} className={joinClassName}>
        <ModalBody className={styles.body}>
          <p className={styles.text}>Enter your contact details to join</p>
          <h4 className={styles.title}>{groupTitle}</h4>

          <form className={styles.form} onSubmit={onJoin}>
            <Input
              type="text"
              placeholder="Enter your email or mobile"
              className={styles.input}
            />
            <Button wide type="submit">Continue</Button>
          </form>

          <p className={styles.text}>
            Dialog is all your team messaging with free calling,<br />
            file sharing and fast mobile applications.
          </p>
        </ModalBody>
      </Modal>
    );
  }
}

export default JoinModal;
