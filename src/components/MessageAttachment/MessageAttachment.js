/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React, { PureComponent } from 'react';
import MessageAttachmentReply from './MessageAttachmentReply';
import MessageAttachmentForward from './MessageAttachmentForward';

class MessageAttachment extends PureComponent {
  props: Props;

  render() {
    const { attachment } = this.props;

    switch (attachment.type) {
      case 'reply':
        return (
          <MessageAttachmentReply
            className={this.props.className}
            message={attachment.message}
            goToPeer={this.props.goToPeer}
            goToMessage={this.props.goToMessage}
          />
        );
      case 'forward':
        return (
          <MessageAttachmentForward
            className={this.props.className}
            from={attachment.from}
            messages={attachment.messages}
            goToPeer={this.props.goToPeer}
            goToMessage={this.props.goToMessage}
          />
        );
      default:
        console.error(`Unsupported message attachment type: ${attachment.type}`);
        return null;
    }
  }
}

export default MessageAttachment;
