/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalClose from '../ModalClose/ModalClose';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalBody from '../ModalBody/ModalBody';
import ModalFooter from '../ModalFooter/ModalFooter';
import Button from '../Button/Button';
import AttachmentModalMeta from './AttachmentModalMeta';
import AttachmentModalPreview from './AttachmentModalPreview';
import styles from './AttachmentModal.css';

class AttachmentModal extends Component {
  static propTypes = {
    className: PropTypes.string,
    attachments: PropTypes.any,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOpen: false
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleSendAll = this.handleSendAll.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.index !== this.props.index ||
           nextProps.className !== this.props.className ||
           nextProps.isOpen !== this.props.isOpen ||
           nextProps.attachment !== this.props.attachment ||
           nextProps.onClose !== this.props.onClose ||
           nextProps.onSend !== this.props.onSend;
  }

  handleSend() {
    const { attachments } = this.props;
    const { index } = this.state;

    this.props.onSend(attachments[index]);
  }

  handleSendAll() {

  }

  renderHeader() {
    const { onClose } = this.props;

    return (
      <ModalHeader withBorder>
        <Text id="AttachmentModal.title" />
        {this.renderPagination()}
        <ModalClose onClick={onClose} />
      </ModalHeader>
    );
  }

  renderPagination() {
    const { attachments } = this.props;

    if (attachments.length === 1) {
      return null;
    }

    return (
      <span>Pagination</span>
    );
  }

  renderFooter() {
    const { attachments } = this.props;

    if (attachments.length === 1) {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            rounded={false}
            onClick={this.handleSend}
          >
            <Text id="AttachmentModal.button_send" />
          </Button>
        </ModalFooter>
      );
    }

    return (
      <ModalFooter className={styles.footer}>
        <Button
          wide
          rounded={false}
          onClick={this.handleSendAll}
          className={styles.halfButton}
        >
          <Text id="AttachmentModal.button_send_all" />
        </Button>
        <Button
          wide
          rounded={false}
          onClick={this.handleSend}
          className={styles.halfButton}
          theme="success"
        >
          <Text id="AttachmentModal.button_send" />
        </Button>
      </ModalFooter>
    );
  }

  render() {
    console.debug(this.props, this.state);
    const { isOpen, onClose, attachments } = this.props;
    const { index } = this.state;
    const className = classNames(styles.root, this.props.className);

    if (!isOpen) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        {this.renderHeader()}
        <ModalBody className={styles.body}>
          <AttachmentModalPreview attachment={attachments[index]} />
          <AttachmentModalMeta attachment={attachments[index]} />
        </ModalBody>
        {this.renderFooter()}
      </Modal>
    );
  }
}

export default AttachmentModal;
