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
import React, { PureComponent } from 'react';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import MessageState from '../MessageState/MessageState';
import Hover from '../Hover/Hover';
import styles from './Message.css';

export type Props = {
  message: MessageType,
  short: boolean,
  state: ?MessageStateType,
  sender: ?PeerInfo,
  className?: string,
  onTimeClick: (message: MessageType) => any,
  onTitleClick?: (message: MessageType) => any,
  onAvatarClick?: (message: MessageType) => any,
  onMentionClick?: (message: MessageType) => any,
  onLightboxOpen?: (message: MessageType) => any,
  renderActions?: () => React.Element<any>[]
};

export type State = {
  hover: boolean
};

class Message extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false
    };
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

  handleHover = (hover: boolean): void => {
    this.setState({ hover });
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
    const avatarClassName = classNames({
      [styles.clickable]: this.props.onAvatarClick
    });

    return (
      <div className={styles.avatar}>
        <PeerAvatar peer={sender} size="large" onClick={onClick} className={avatarClassName} />
      </div>
    );
  }

  renderHeader(): ?React.Element<any> {
    if (this.props.short) {
      return null;
    }

    const { message: { date } } = this.props;
    const sender = this.getSender();

    const onTitleClick = this.props.onTitleClick ? this.handleTitleClick : null;
    const titleClassName = classNames(styles.title, {
      [styles.clickable]: this.props.onTitleClick
    });

    const onMentionClick = this.props.onMentionClick ? this.handleMentionClick : null;
    const mentionClassName = classNames(styles.username, {
      [styles.clickable]: this.props.onMentionClick
    });

    const onTimeClick = this.props.onMentionClick ? this.handleTimeClick : null;
    const timeClassName = classNames(styles.timestamp, {
      [styles.clickable]: this.props.onMentionClick
    });

    const username = sender.userName ? (
      <span className={mentionClassName} onClick={onMentionClick}>@{sender.userName}</span>
    ) : null;

    return (
      <header className={styles.header}>
        <div className={styles.sender}>
          <span className={titleClassName} onClick={onTitleClick}>{sender.title}</span>
          {username}
        </div>
        <time className={timeClassName} onClick={onTimeClick}>{date}</time>
        {this.renderState()}
      </header>
    );
  }

  renderActions(): ?React.Element<any> {
    if (this.state.hover && this.props.renderActions) {
      return (
        <div className={styles.actions}>
          {this.props.renderActions()}
        </div>
      );
    }

    return null;
  }

  render(): React.Element<any> {
    const { short, message: { content } } = this.props;
    const className = classNames(styles.container, {
      [styles.short]: short
    }, this.props.className);

    return (
      <Hover className={className} onHover={this.handleHover}>
        {this.renderAvatar()}
        <div className={styles.body}>
          {this.renderHeader()}
          <div className={styles.content}>
            <MessageContent content={content} onLightboxOpen={this.handleLightboxOpen} />
          </div>
        </div>
        {this.renderActions()}
      </Hover>
    );
  }
}

export default Message;
