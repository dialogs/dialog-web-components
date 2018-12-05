/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo, Peer } from '@dlghq/dialog-types';
import { Text } from '@dlghq/react-l10n';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import ActivityList from '../ActivityList/ActivityList';
import styles from './ActivityPinned.css';
import ActivityPinnedMessage from './ActivityPinnedMessage/ActivityPinnedMessage';

export type Props = {
  className?: ?string,
  info: PeerInfo,
  messages: Message[],
  onGoToPeer?: (peer: Peer) => mixed,
  onGoToMessage?: (peer: Peer, message: Message) => mixed,
  onDeleteMessage?: (message: Message) => mixed,
  onLightboxOpen?: (message: Message) => mixed,
};

class ActivityPinned extends PureComponent<Props> {
  renderMessages(): Node {
    const { messages, info } = this.props;

    if (!messages.length) {
      return (
        <div className={styles.empty}>
          <Text id="ActivityPinned.empty" />
        </div>
      );
    }

    return messages.map((message) => {
      return (
        <ActivityPinnedMessage
          key={message.rid}
          message={message}
          info={info}
          onDeleteMessage={this.props.onDeleteMessage}
          onGoToPeer={this.props.onGoToPeer}
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

export default ActivityPinned;
