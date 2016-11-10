/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Attachment, AttachmentModalProps } from './types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalClose from '../ModalClose/ModalClose';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalBody from '../ModalBody/ModalBody';
import ModalFooter from '../ModalFooter/ModalFooter';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import AttachmentMeta from './AttachmentMeta';
import AttachmentPreview from './AttachmentPreview';
import styles from './AttachmentModal.css';

class AttachmentModal extends Component {
  props: AttachmentModalProps;

  handleSend: Function;
  handleNext: Function;
  handlePrevious: Function;
  handleChange: Function;
  handleSendAll: Function;

  constructor(props: AttachmentModalProps) {
    super(props);

    this.handleSend = this.handleSend.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSendAll = this.handleSendAll.bind(this);
  }

  shouldComponentUpdate(nextProps: AttachmentModalProps): boolean {
    return nextProps.current !== this.props.current ||
           nextProps.attachments !== this.props.attachments ||
           nextProps.className !== this.props.className;
  }

  handleSend(): void {
    this.props.onSend([this.getCurrentAttachment()]);
  }

  handleSendAll(): void {
    const { attachments } = this.props;
    this.props.onSendAll(attachments);
  }

  handleNext(): void {
    const { current, attachments } = this.props;
    this.props.onCurrentChange(
      Math.min(attachments.length - 1, current + 1)
    );
  }

  handlePrevious(): void {
    const { current } = this.props;
    this.props.onCurrentChange(
      Math.max(0, current - 1)
    );
  }

  handleChange(attachment: Attachment): void {
    this.props.onAttachmentChange(this.props.current, attachment);
  }

  getCurrentAttachment(): Attachment {
    return this.props.attachments[this.props.current];
  }

  renderPagination() {
    const { current, attachments } = this.props;

    if (attachments.length === 1) {
      return null;
    }

    return (
      <div className={styles.pagination}>
        <Icon
          className={styles.paginationArrow}
          glyph="chevron_left"
          onClick={this.handlePrevious}
        />
        <span className={styles.paginationNumbers}>
          {current + 1} / {attachments.length}
        </span>
        <Icon
          className={styles.paginationArrow}
          glyph="chevron_right"
          onClick={this.handleNext}
        />
      </div>
    );
  }

  renderBody() {
    const attachment = this.getCurrentAttachment();
    if (!attachment) {
      return null;
    }

    return (
      <ModalBody className={styles.body}>
        <AttachmentPreview file={attachment.file} />
        <AttachmentMeta attachment={attachment} onChange={this.handleChange} />
      </ModalBody>
    );
  }

  renderFooter() {
    const { attachments } = this.props;

    if (attachments.length === 1) {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="primary"
            rounded={false}
            onClick={this.handleSendAll}
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
          theme="primary"
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
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder className={styles.header}>
          <Text id="AttachmentModal.title" />
          {this.renderPagination()}
          <ModalClose onClick={this.props.onClose} />
        </ModalHeader>
        {this.renderBody()}
        {this.renderFooter()}
      </Modal>
    );
  }
}

export default AttachmentModal;
