/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  // Peer,
  Message as MessageType,
  MessageState as MessageStateType
} from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import MessageState from '../MessageState/MessageState';
import styles from './Message.css';

export type Props = {
  // peer: Peer,
  message: MessageType,
  state: MessageStateType,
  renderActions?: () => React.Element<any>[]
};

class Message extends PureComponent {
  props: Props;

  renderState(): ?React.Element<any> {
    const { state } = this.props;

    if (state === 'unknown') {
      return null;
    }

    return (
      <MessageState state={state} />
    );
  }

  renderActions(): ?React.Element<any> {
    if (!this.props.renderActions) {
      return null;
    }

    return (
      <div className={styles.actions}>
        {this.props.renderActions()}
      </div>
    );
  }

  render(): React.Element<any> {
    const { message: { content, sender, date } } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.avatar}>
          <PeerAvatar peer={sender} size="large" />
        </div>
        <div className={styles.body}>
          <header className={styles.header}>
            <div className={styles.sender}>{sender.title}</div>
            <time className={styles.timestamp}>{date}</time>
            {this.renderState()}
          </header>
          <div className={styles.content}>
            <MessageContent content={content} />
          </div>
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default Message;
