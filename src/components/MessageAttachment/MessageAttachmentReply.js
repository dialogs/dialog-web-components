/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import MessageAttachmentItem from './MessageAttachmentItem';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  messages: Message[],
  onGoToPeer: (peer: Peer) => any,
  onGoToMessage: (message: Message) => any
};

class MessageAttachmentReply extends PureComponent {
  props: Props;

  render() {
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
          onGoToMessage={this.props.onGoToMessage}
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
