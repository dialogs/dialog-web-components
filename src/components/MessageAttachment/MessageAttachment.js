/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, MessageAttachment as MessageAttachmentType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageAttachmentReply from './MessageAttachmentReply';
import MessageAttachmentForward from './MessageAttachmentForward';

type Props = {
  className?: string,
  attachment: MessageAttachmentType,
  onGoToPeer: (peer: Peer) => any,
  onGoToMessage: (message: Message) => any
};

class MessageAttachment extends PureComponent {
  props: Props;

  render() {
    const { attachment } = this.props;

    switch (attachment.type) {
      case 'reply':
        return (
          <MessageAttachmentReply
            className={this.props.className}
            messages={attachment.messages}
            onGoToPeer={this.props.onGoToPeer}
            onGoToMessage={this.props.onGoToMessage}
          />
        );

      case 'forward':
        return (
          <MessageAttachmentForward
            className={this.props.className}
            from={attachment.from}
            messages={attachment.messages}
            onGoToPeer={this.props.onGoToPeer}
            onGoToMessage={this.props.onGoToMessage}
          />
        );

      default:
        console.error(`Unsupported message attachment type: ${attachment.type}`);
        return null;
    }
  }
}

export default MessageAttachment;
