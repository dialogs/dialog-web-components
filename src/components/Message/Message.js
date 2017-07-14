/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint max-lines: ["error", 500] */

import type { Map } from 'immutable';
import type {
  Message as MessageType,
  MessageState as MessageStateType,
  PeerInfo,
  Peer
} from '@dlghq/dialog-types';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import MessageState from '../MessageState/MessageState';
import MessageReaction from '../MessageReaction/MessageReaction';
import Hover from '../Hover/Hover';
import CopyOnly from '../CopyOnly/CopyOnly';
import MessageAttachmentReply from '../MessageAttachment/MessageAttachmentReply';
import MessageAttachmentForward from '../MessageAttachment/MessageAttachmentForward';
import CheckButton from '../CheckButton/CheckButton';
import styles from './Message.css';

export type Props = {
  users: Map<number, PeerInfo>,
  message: MessageType,
  short: boolean,
  state: ?MessageStateType,
  sender: ?PeerInfo,
  className?: string,
  forceHover?: boolean,
  selected: ?boolean,
  highlight?: boolean,
  maxWidth: number,
  maxHeight: number,
  isSelectionEnabled?: boolean,
  isReactionsEnabled?: boolean,
  renderActions?: () => React.Element<any>[],
  onSelect?: (message: MessageType) => any,
  onTitleClick?: (message: MessageType) => any,
  onAvatarClick?: (message: MessageType) => any,
  onMentionClick?: (message: MessageType) => any,
  onLightboxOpen?: (message: MessageType) => any,
  onReaction?: (char: string) => any,
  onGoToPeer: (peer: Peer) => any,
  onGoToMessage: (peer: ?Peer, message: MessageType) => any
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

  handleTitleClick = (event: SyntheticMouseEvent) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onTitleClick) {
        this.props.onTitleClick(this.props.message);
      }
    }
  };

  handleAvatarClick = (event: SyntheticMouseEvent) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onAvatarClick) {
        this.props.onAvatarClick(this.props.message);
      }
    }
  };

  handleMentionClick = (event: SyntheticMouseEvent) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onMentionClick) {
        this.props.onMentionClick(this.props.message);
      }
    }
  };

  handleLightboxOpen = (event: SyntheticMouseEvent) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onLightboxOpen) {
        this.props.onLightboxOpen(this.props.message);
      }
    }
  };

  handleHover = (hover: boolean): void => {
    this.setState({ hover });
  };

  handleSelect = (event: SyntheticEvent): void => {
    if (this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();
      this.handleForceSelect();
    }
  };

  handleForceSelect = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.message);
    }
  };

  isSelectionMode(): boolean {
    return Boolean(this.props.isSelectionEnabled) && typeof this.props.selected === 'boolean';
  }

  isHover(): boolean {
    if (this.props.forceHover) {
      return true;
    }

    return this.state.hover;
  }

  hasSelection(): boolean {
    const container = findDOMNode(this);
    if (container) {
      const selection = document.getSelection();

      return Boolean(selection && selection.toString());
    }

    return false;
  }

  getState(): MessageStateType {
    return this.props.state || this.props.message.state;
  }

  getSender(): ?PeerInfo {
    return this.props.sender || this.props.message.sender;
  }

  renderState() {
    const state = this.getState();
    const { short } = this.props;
    const className = classNames(short ? styles.stateShort : null);

    return (
      <MessageState
        className={className}
        state={state}
        time={this.props.message.date}
        onClick={this.handleForceSelect}
      />
    );
  }

  renderAvatar() {
    const sender = this.getSender();
    if (!sender) {
      return null;
    }

    const onClick = this.props.onAvatarClick ? this.handleAvatarClick : undefined;
    const avatarClassName = classNames({
      [styles.clickable]: this.props.onAvatarClick
    });

    return (
      <div className={styles.avatar}>
        <PeerAvatar peer={sender} size={40} onClick={onClick} className={avatarClassName} />
      </div>
    );
  }

  renderHeader() {
    const sender = this.getSender();
    if (!sender) {
      return null;
    }

    const onTitleClick = this.props.onTitleClick ? this.handleTitleClick : null;
    const titleClassName = classNames(styles.title, {
      [styles.clickable]: this.props.onTitleClick
    });

    const onMentionClick = this.props.onMentionClick ? this.handleMentionClick : null;
    const mentionClassName = classNames(styles.username, {
      [styles.clickable]: this.props.onMentionClick
    });

    return (
      <header className={styles.header}>
        <PeerInfoTitle
          info={sender}
          title={sender.title}
          userName={this.props.maxWidth > 300 ? sender.userName : null}
          titleClassName={titleClassName}
          userNameClassName={mentionClassName}
          onTitleClick={onTitleClick}
          onUserNameClick={onMentionClick}
        />
        {this.renderState()}
      </header>
    );
  }

  renderShortHeader() {
    const { message: { date } } = this.props;
    const sender = this.getSender();
    if (!sender) {
      return null;
    }

    const username = sender.userName ? ` @${sender.userName}` : '';

    return (
      <CopyOnly>
        {sender.title + username + ' ' + date}
      </CopyOnly>
    );
  }

  renderActions() {
    const { selected, renderActions } = this.props;

    if (typeof selected === 'boolean') {
      return (
        <CheckButton
          stopPropagation
          checked={selected}
          className={styles.selector}
          theme="primary"
          size={24}
          onClick={this.handleForceSelect}
        />
      );
    } else if (this.isHover() && renderActions) {
      return (
        <div className={styles.actions}>
          {renderActions()}
        </div>
      );
    }

    return null;
  }

  renderReactions() {
    const { message, users } = this.props;

    if (!message.reactions || !message.reactions.length || !this.props.isReactionsEnabled) {
      return null;
    }

    const children = message.reactions.map((reaction) => {
      return (
        <MessageReaction
          key={reaction.code}
          className={styles.reactionButton}
          users={users}
          reaction={reaction}
          onToggle={this.props.onReaction}
        />
      );
    });

    return (
      <div className={styles.reactions}>
        {children}
      </div>
    );
  }

  renderReply() {
    const { message: { attachment }, maxWidth, maxHeight } = this.props;
    if (attachment && attachment.type === 'reply') {
      return (
        <MessageAttachmentReply
          className={styles.reply}
          messages={attachment.messages}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      );
    }

    return null;
  }

  renderForward() {
    const { message: { attachment }, maxWidth, maxHeight } = this.props;
    if (attachment && attachment.type === 'forward') {
      return (
        <MessageAttachmentForward
          className={styles.forward}
          from={attachment.from}
          messages={attachment.messages}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      );
    }

    return null;
  }

  render() {
    const { short, message: { content, rid }, highlight, maxWidth, maxHeight } = this.props;
    const hover = this.isHover();
    const state = this.getState();
    const isError = state === 'error';
    const isPending = state === 'pending';
    const isUnread = state !== 'unknown' && state !== 'read';

    const className = classNames(
      styles.container,
      this.props.className,
      hover ? styles.hover : null,
      isError ? styles.error : null,
      isUnread ? styles.unread : null,
      highlight ? styles.highlight : null,
      this.isSelectionMode() ? styles.selectable : null,
    );

    return (
      <Hover className={className} onHover={this.handleHover} onClick={this.handleSelect}>
        <CopyOnly block />
        {this.renderActions()}
        <div className={styles.info}>
          {short ? null : this.renderAvatar()}
          {short && hover ? this.renderState() : null}
        </div>
        <div className={styles.body}>
          {short ? this.renderShortHeader() : this.renderHeader()}
          <div className={styles.content}>
            {this.renderReply()}
            <MessageContent
              content={content}
              rid={rid}
              isPending={isPending}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              onLightboxOpen={this.handleLightboxOpen}
            />
            {this.renderForward()}
            {this.renderReactions()}
          </div>
        </div>
      </Hover>
    );
  }
}

export default Message;
