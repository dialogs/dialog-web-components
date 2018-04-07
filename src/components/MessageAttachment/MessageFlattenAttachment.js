/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, MessageAttachment as MessageAttachmentType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageAttachment from './MessageAttachment';
import flattenMessageAttachment from './utils/flatten';

type Props = {
  className?: string,
  attachment: MessageAttachmentType,
  maxHeight: number,
  maxWidth: number,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: ?Peer, message: Message) => mixed,
  onForwardLightboxOpen?: (messages: Message[], focus: Message) => mixed
};

class MessageFlattenAttachment extends PureComponent<Props> {
  handleLightboxOpen = (focus: Message) => {
    if (this.props.onForwardLightboxOpen) {
      this.props.onForwardLightboxOpen(this.props.attachment.messages, focus);
    }
  };

  render() {
    const children = flattenMessageAttachment(this.props.attachment).map((attachment, key) => {
      return (
        <MessageAttachment
          key={key}
          className={this.props.className}
          attachment={attachment}
          maxWidth={this.props.maxWidth}
          maxHeight={this.props.maxHeight}
          onLightboxOpen={this.handleLightboxOpen}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    });

    return (
      <div>
        {children}
      </div>
    );
  }
}

export default MessageFlattenAttachment;
