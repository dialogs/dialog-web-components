/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import ActivityListItem from '../ActivityList/ActivityListItem';
import ActivityMediaDocument from './ActivityMediaDocument/ActivityMediaDocument';
import ActivityMediaPhoto from './ActivityMediaPhoto/ActivityMediaPhoto';

type Props = {
  message: Message,
  onClick: (message: Message) => mixed
};

class ActivityMediaItem extends PureComponent {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.message);
  };

  renderContent() {
    const { message } = this.props;

    switch (message.content.type) {
      case 'photo':
        return (
          <ActivityMediaPhoto
            title={message.content.fileName}
            photo={message.content.fileUrl}
            preview={message.content.preview}
            sender={message.sender.title}
          />
        );
      case 'document':
        return (
          <ActivityMediaDocument
            title={message.content.fileName}
            size={message.content.fileSize}
            sender={message.sender.title}
            extension={'asdasddsd'}
          />
        );
      default:
        console.warn('Unsupported message type');
        return null;
    }
  }

  render() {
    return (
      <ActivityListItem onClick={this.handleClick}>
        {this.renderContent()}
      </ActivityListItem>
    );
  }
}

export default ActivityMediaItem;
