/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, MessageAttachment as MessageAttachmentType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageAttachmentReply from './MessageAttachmentReply';
import MessageAttachmentForward from './MessageAttachmentForward';

type Props = {
  className?: string,
  attachment: MessageAttachmentType,
  maxHeight: number,
  maxWidth: number,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: ?Peer, message: Message) => mixed,
  onLightboxOpen?: (message: Message) => mixed
};

class MessageAttachment extends PureComponent<Props> {
  render() {
    const { attachment, maxWidth, maxHeight } = this.props;

    switch (attachment.type) {
      case 'reply':
        return (
          <MessageAttachmentReply
            className={this.props.className}
            messages={attachment.messages}
            onGoToPeer={this.props.onGoToPeer}
            onGoToMessage={this.props.onGoToMessage}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
          />
        );

      case 'forward':
        return (
          <MessageAttachmentForward
            className={this.props.className}
            from={attachment.from}
            onLightboxOpen={this.props.onLightboxOpen}
            messages={attachment.messages}
            onGoToPeer={this.props.onGoToPeer}
            onGoToMessage={this.props.onGoToMessage}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
          />
        );

      default:
        console.error(`Unsupported message attachment type: ${attachment.type}`);

        return null;
    }
  }
}

export default MessageAttachment;
