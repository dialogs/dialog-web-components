/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import MessageAttachmentItem from './MessageAttachmentItem';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  messages: Message[],
  onGoToPeer: (peer: Peer) => any,
  onGoToMessage: (peer: ?Peer, message: Message) => any,
  maxHeight: number,
  maxWidth: number
};

class MessageAttachmentReply extends PureComponent {
  props: Props;

  handleGoToMessage = (message: Message) => {
    this.props.onGoToMessage(null, message);
  };

  render() {
    const { maxHeight, maxWidth } = this.props;
    const className = classNames(styles.container, this.props.className);

    const children = this.props.messages.map((message) => {
      return (
        <MessageAttachmentItem
          key={message.rid}
          type="reply"
          short={false}
          peer={null}
          message={message}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.handleGoToMessage}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      );
    });

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export default MessageAttachmentReply;
