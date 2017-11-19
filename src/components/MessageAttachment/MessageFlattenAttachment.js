/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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
  onGoToPeer: (peer: Peer) => any,
  onGoToMessage: (peer: ?Peer, message: Message) => any
};

class MessageFlattenAttachment extends PureComponent<Props> {
  render() {
    const children = flattenMessageAttachment(this.props.attachment).map((attachment, key) => {
      return (
        <MessageAttachment
          key={key}
          className={this.props.className}
          attachment={attachment}
          maxWidth={this.props.maxWidth}
          maxHeight={this.props.maxHeight}
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
