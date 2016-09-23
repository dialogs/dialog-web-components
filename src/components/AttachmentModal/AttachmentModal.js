/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { AttachmentModalProps, AttachmentModalState } from './types';
import React, { Component } from 'react';
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
  props: AttachmentModalProps;
  state: AttachmentModalState;

  handleSend: Function;
  handleSendAll: Function;

  constructor(props: AttachmentModalProps) {
    super(props);

    this.state = {
      current: 0
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleSendAll = this.handleSendAll.bind(this);
  }

  shouldComponentUpdate(nextProps: AttachmentModalProps, nextState: AttachmentModalState) {
    return nextState.current !== this.state.current ||
           nextProps.isOpen !== this.props.isOpen ||
           nextProps.attachments !== this.props.attachments ||
           nextProps.className !== this.props.className;
  }

  handleSend() {
    this.props.onSend(this.getCurrentAttachment());
  }

  handleSendAll() {
    const { attachments } = this.props;
    const { current } = this.state;

    for (let i = current; i < attachments.length; i++) {
      this.props.onSend(attachments[i]);
    }
  }

  getCurrentAttachment(): File {
    return this.props.attachments[this.state.current];
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
    const { isOpen, onClose } = this.props;
    const currentAttachment = this.getCurrentAttachment();
    const className = classNames(styles.root, this.props.className);

    if (!isOpen) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        {this.renderHeader()}
        <ModalBody className={styles.body}>
          <AttachmentModalPreview attachment={currentAttachment} />
          <AttachmentModalMeta attachment={currentAttachment} />
        </ModalBody>
        {this.renderFooter()}
      </Modal>
    );
  }
}

export default AttachmentModal;
