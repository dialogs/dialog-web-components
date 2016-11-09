/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message as MessageType } from '@dlghq/dialog-types';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import MessageState from '../MessageState/MessageState';
import styles from './Message.css';

export type Props = {
  message: MessageType,
  renderActions?: () => React.Element<any>[],
  short: boolean,
  fake: ?boolean
};

class Message extends PureComponent {
  props: Props;

  renderState(): ?React.Element<any> {
    const { message: { state } } = this.props;

    if (state === 'unknown') {
      return null;
    }

    return (
      <MessageState state={state} />
    );
  }

  renderAvatar(): ?React.Element<any> {
    const { short, message: { sender } } = this.props;

    if (short) {
      return null;
    }

    return (
      <div className={styles.avatar}>
        <PeerAvatar peer={sender} size="large" />
      </div>
    );
  }

  renderHeader(): ?React.Element<any> {
    const { short, message: { sender, date } } = this.props;

    if (short) {
      return null;
    }

    return (
      <header className={styles.header}>
        <div className={styles.sender}>{sender.title}</div>
        <time className={styles.timestamp}>{date}</time>
        {this.renderState()}
      </header>
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
    const { short, message: { content } } = this.props;
    const className = classNames(styles.container, {
      [styles.short]: short
    });

    return (
      <div className={className}>
        {this.renderAvatar()}
        <div className={styles.body}>
          {this.renderHeader()}
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
