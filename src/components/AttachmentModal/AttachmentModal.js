/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Attachment, AttachmentModalProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalClose from '../Modal/ModalClose';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import AttachmentMeta from './AttachmentMeta';
import AttachmentPreview from './AttachmentPreview';
import styles from './AttachmentModal.css';

class AttachmentModal extends PureComponent {
  props: AttachmentModalProps;

  handleSend = (): void => {
    const { attachments } = this.props;
    if (attachments.length === 1) {
      this.props.onSendAll(attachments);
    } else {
      this.props.onSend([this.getCurrentAttachment()]);
    }
  };

  handleSendAll = (): void => {
    const { attachments } = this.props;
    this.props.onSendAll(attachments);
  };

  handleNext = (): void => {
    const { current, attachments } = this.props;
    this.props.onCurrentChange(
      Math.min(attachments.length - 1, current + 1)
    );
  };

  handlePrevious = (): void => {
    const { current } = this.props;
    this.props.onCurrentChange(
      Math.max(0, current - 1)
    );
  };

  handleChange = (attachment: Attachment): void => {
    this.props.onAttachmentChange(this.props.current, attachment);
  };

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

    const hotKeyMap = {
      next: 'right',
      previous: 'left',
      send: 'enter',
      sendAll: 'mod+enter'
    };

    const hotKeyHandlers = {
      next: this.handleNext,
      previous: this.handlePrevious,
      send: this.handleSend,
      sendAll: this.handleSendAll
    };

    return (
      <Modal className={className} onClose={this.props.onClose} keyMap={hotKeyMap} handlers={hotKeyHandlers}>
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
