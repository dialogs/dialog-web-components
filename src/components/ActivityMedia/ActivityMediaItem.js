/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import ActivityListItem from '../ActivityList/ActivityListItem';
import ActivityMediaDocument from './ActivityMediaDocument/ActivityMediaDocument';
import ActivityMediaPhoto from './ActivityMediaPhoto/ActivityMediaPhoto';
import ActivityMediaVoice from './ActivityMediaVoice/ActivityMediaVoice';
import ActivityMediaVideo from './ActivityMediaVideo/ActivityMediaVideo';

type Props = {
  message: Message,
  onClick: (message: Message) => mixed
};

class ActivityMediaItem extends PureComponent {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.message);
  };

  render() {
    const { message } = this.props;

    switch (message.content.type) {
      case 'photo':
        return (
          <ActivityListItem onClick={this.handleClick}>
            <ActivityMediaPhoto
              title={message.content.fileName}
              photo={message.content.fileUrl}
              preview={message.content.preview}
              sender={message.sender ? message.sender.title : null}
            />
          </ActivityListItem>
        );
      case 'document':
        return (
          <ActivityListItem onClick={this.handleClick}>
            <ActivityMediaDocument
              title={message.content.fileName}
              size={message.content.fileSize}
              extension={message.content.fileExtension}
              sender={message.sender ? message.sender.title : null}
            />
          </ActivityListItem>
        );
      case 'voice':
        return (
          <ActivityListItem onClick={this.handleClick}>
            <ActivityMediaVoice
              url={message.content.fileUrl}
              duration={message.content.duration}
              sender={message.sender ? message.sender.title : null}
            />
          </ActivityListItem>
        );
      case 'video':
        return (
          <ActivityListItem onClick={this.handleClick}>
            <ActivityMediaVideo
              title={message.content.fileName}
              duration={message.content.duration}
              preview={message.content.preview}
              size={message.content.fileSize}
              sender={message.sender ? message.sender.title : null}
            />
          </ActivityListItem>
        );
      default:
        console.warn('Unsupported message type');

        return null;
    }
  }
}

export default ActivityMediaItem;
