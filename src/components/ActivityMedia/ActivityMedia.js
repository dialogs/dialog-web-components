/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
import { Text } from '@dlghq/react-l10n';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import ActivityList from '../ActivityList/ActivityList';
import ActivityMediaItem from './ActivityMediaItem';
import styles from './ActivityMedia.css';

export type Props = {
  className?: string,
  messages: Array<Message>,
  onGoToMessage: (message: Message) => mixed,
  onLightboxOpen: (message: Message) => mixed,
};

class ActivityMedia extends PureComponent<Props> {
  renderMessages(): Node {
    const { messages } = this.props;

    if (!messages.length) {
      return (
        <div className={styles.empty}>
          <Text id="ActivityMedia.empty" />
        </div>
      );
    }

    return messages.map((message) => {
      return (
        <ActivityMediaItem
          key={message.rid}
          message={message}
          onGoToMessage={this.props.onGoToMessage}
          onLightboxOpen={this.props.onLightboxOpen}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <ActivityList className={className}>{this.renderMessages()}</ActivityList>
    );
  }
}

export default ActivityMedia;
