/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import Button from '../Button/Button';
import Input from '../Input/Input';
import IconButton from '../IconButton/IconButton';
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
          <div className={styles.text}>Enter your contact details to join</div>
          <h4 className={styles.title}>{groupTitle}</h4>

          <form className={styles.form}>
            <Input
              type="text"
              placeholder="Enter your email or mobile"
              className={styles.input}
            />
            <Button wide onClick={onJoin}>Continue</Button>
          </form>

          <div className={styles.clean}>
            Dialog is all your team messaging with free calling,<br />
            file sharing and fast mobile applications.
          </div>
          <div className={styles.buttons} >
            <IconButton glyph="logo" flat className={styles.button} size="large" />
            <IconButton glyph="phone" flat className={styles.button} size="large" />
            <IconButton glyph="apple" flat className={styles.button} size="large" />
            <IconButton glyph="android" flat className={styles.button} size="large" />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default JoinModal;
