/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  Message as MessageType,
  MessageState as MessageStateType,
  PeerInfo
} from '@dlghq/dialog-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import MessageState from '../MessageState/MessageState';
import styles from './Message.css';

export type Props = {
  message: MessageType,
  short: boolean,
  state: ?MessageStateType,
  sender: ?PeerInfo,
  onTimeClick: (message: MessageType) => any,
  onTitleClick?: (message: MessageType) => any,
  onAvatarClick?: (message: MessageType) => any,
  onMentionClick?: (message: MessageType) => any,
  onLightboxOpen?: (message: MessageType) => any,
  renderActions?: () => React.Element<any>[]
};

class Message extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.message !== this.props.message ||
           nextProps.state !== this.props.state ||
           nextProps.short !== this.props.short ||
           nextProps.sender !== this.props.sender;
  }

  handleTitleClick = () => {
    if (this.props.onTitleClick) {
      this.props.onTitleClick(this.props.message);
    }
  };

  handleAvatarClick = () => {
    if (this.props.onAvatarClick) {
      this.props.onAvatarClick(this.props.message);
    }
  };

  handleMentionClick = () => {
    if (this.props.onMentionClick) {
      this.props.onMentionClick(this.props.message);
    }
  };

  handleTimeClick = () => {
    if (this.props.onTimeClick) {
      this.props.onTimeClick(this.props.message);
    }
  };

  handleLightboxOpen = () => {
    if (this.props.onLightboxOpen) {
      this.props.onLightboxOpen(this.props.message);
    }
  };

  getState(): MessageStateType {
    return this.props.state || this.props.message.state;
  }

  getSender(): PeerInfo {
    return this.props.sender || this.props.message.sender;
  }

  renderState(): ?React.Element<any> {
    const state = this.getState();
    if (state === 'unknown') {
      return null;
    }

    return (
      <MessageState state={state} />
    );
  }

  renderAvatar(): ?React.Element<any> {
    if (this.props.short) {
      return null;
    }

    const sender = this.getSender();
    const onClick = this.props.onAvatarClick ? this.handleAvatarClick : null;

    return (
      <div className={styles.avatar}>
        <PeerAvatar peer={sender} size="large" onClick={onClick} />
      </div>
    );
  }

  renderHeader(): ?React.Element<any> {
    if (this.props.short) {
      return null;
    }

    const { message: { date } } = this.props;
    const sender = this.getSender();
    const mention = sender.userName ? (
      <span className={styles.mention} onClick={this.handleMentionClick}>
        {` @${sender.userName}`}
      </span>
    ) : null;

    return (
      <header className={styles.header}>
        <div className={styles.sender}>
          <span className={styles.title} onClick={this.handleTitleClick}>{sender.title}</span>
          {mention}
        </div>
        <time className={styles.timestamp} onClick={this.handleTimeClick}>{date}</time>
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
            <MessageContent content={content} onLightboxOpen={this.handleLightboxOpen} />
          </div>
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default Message;
