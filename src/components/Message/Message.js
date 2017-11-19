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
  Peer,
  MessageMediaInteractiveConfirm
} from '@dlghq/dialog-types';
import classNames from 'classnames';
import React, { PureComponent, type Node } from 'react';
import { findDOMNode } from 'react-dom';
import MessageContent from '../MessageContent/MessageContent';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import MessageState from '../MessageState/MessageState';
import MessageReaction from '../MessageReaction/MessageReaction';
import Hover from '../Hover/Hover';
import CopyOnly from '../CopyOnly/CopyOnly';
import MessageAttachmentReply from '../MessageAttachment/MessageAttachmentReply';
import MessageFlattenAttachment from '../MessageAttachment/MessageFlattenAttachment';
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
  renderActions?: () => Node,
  onSelect?: (message: MessageType) => mixed,
  onTitleClick?: (message: MessageType) => mixed,
  onAvatarClick?: (message: MessageType) => mixed,
  onMentionClick?: (message: MessageType) => mixed,
  onLightboxOpen?: (message: MessageType) => mixed,
  onReaction?: (char: string) => mixed,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: ?Peer, message: MessageType) => mixed,
  onInteractiveAction: (id: string, value: string, confirm?: ?MessageMediaInteractiveConfirm) => mixed
};

export type State = {
  hover: boolean
};

class Message extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  handleTitleClick = (event: SyntheticMouseEvent<>) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onTitleClick) {
        this.props.onTitleClick(this.props.message);
      }
    }
  };

  handleAvatarClick = (event: SyntheticMouseEvent<>) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onAvatarClick) {
        this.props.onAvatarClick(this.props.message);
      }
    }
  };

  handleMentionClick = (event: SyntheticMouseEvent<>) => {
    if (!this.isSelectionMode()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.props.onMentionClick) {
        this.props.onMentionClick(this.props.message);
      }
    }
  };

  handleLightboxOpen = (event: SyntheticMouseEvent<>) => {
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

  handleSelect = (event: SyntheticEvent<>): void => {
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
    return (
      Boolean(this.props.isSelectionEnabled) &&
      typeof this.props.selected === 'boolean'
    );
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
    return (
      <MessageState
        state={this.getState()}
        compact={this.props.short}
        hover={this.state.hover}
        time={this.props.message.date}
        fullTime={this.props.message.fullDate}
        isEdited={this.props.message.isEdited}
        onClick={this.handleForceSelect}
      />
    );
  }

  renderAvatar() {
    const sender = this.getSender();
    if (!sender) {
      return null;
    }

    const onClick = this.props.onAvatarClick
      ? this.handleAvatarClick
      : undefined;
    const avatarClassName = classNames({
      [styles.clickable]: this.props.onAvatarClick
    });

    return (
      <div className={styles.avatar}>
        <PeerAvatar
          peer={sender}
          size={40}
          onClick={onClick}
          className={avatarClassName}
        />
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

    const onMentionClick = this.props.onMentionClick
      ? this.handleMentionClick
      : null;
    const mentionClassName = classNames(styles.username, {
      [styles.clickable]: this.props.onMentionClick
    });

    return (
      <header className={styles.header}>
        <PeerInfoTitle
          className={styles.peerInfo}
          info={sender}
          title={sender.title}
          userName={this.props.maxWidth > 300 ? sender.userName : null}
          titleClassName={titleClassName}
          userNameClassName={mentionClassName}
          onTitleClick={onTitleClick}
          onUserNameClick={onMentionClick}
          addSpacebars
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

    return <CopyOnly>{sender.title + username + ' ' + date}</CopyOnly>;
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
      return <div className={styles.actions}>{renderActions()}</div>;
    }

    return null;
  }

  renderReactions() {
    const { message, users, onReaction } = this.props;

    if (
      !message.reactions ||
      !message.reactions.length ||
      !this.props.isReactionsEnabled ||
      !onReaction
    ) {
      return null;
    }

    const children = message.reactions.map((reaction) => {
      return (
        <MessageReaction
          key={reaction.code}
          className={styles.reactionButton}
          users={users}
          reaction={reaction}
          onToggle={onReaction}
        />
      );
    });

    return <div className={styles.reactions}>{children}</div>;
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
        <MessageFlattenAttachment
          className={styles.forward}
          attachment={attachment}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    }

    return null;
  }

  render() {
    const {
      short,
      message: { content, rid },
      highlight,
      maxWidth,
      maxHeight
    } = this.props;
    const hover = this.isHover();
    const state = this.getState();
    const isError = state === 'error';
    const isPending = state === 'pending';
    const isUnread = state !== 'unknown' && state !== 'read';

    const className = classNames(
      styles.container,
      this.props.className,
      short ? styles.short : null,
      hover ? styles.hover : null,
      isError ? styles.error : null,
      isUnread ? styles.unread : null,
      highlight ? styles.highlight : null,
      this.isSelectionMode() ? styles.selectable : null
    );

    return (
      <Hover
        className={className}
        onHover={this.handleHover}
        onClick={this.handleSelect}
      >
        <CopyOnly block />
        {this.renderActions()}
        <div className={styles.info}>
          {short ? null : this.renderAvatar()}
          {short ? this.renderState() : null}
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
              onInteractiveAction={this.props.onInteractiveAction}
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
