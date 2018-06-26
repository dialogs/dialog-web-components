/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint max-lines: ["error", 500] */

import type { MessageState as MessageStateType, PeerInfo } from '@dlghq/dialog-types';
import type { Props, State } from './types';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
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
    return Boolean(this.props.isSelectionEnabled) && typeof this.props.selected === 'boolean';
  }

  isHover(): boolean {
    if (this.props.forceHover) {
      return true;
    }

    return this.state.hover;
  }

  getState(): MessageStateType {
    return this.props.state || this.props.message.state;
  }

  getSender(): ?PeerInfo {
    return this.props.sender || this.props.message.sender;
  }

  renderState() {
    const { message } = this.props;

    return (
      <MessageState
        state={this.getState()}
        compact={this.props.short}
        hover={this.state.hover}
        time={message.date}
        fullTime={message.fullDate}
        isEdited={message.isEdited && message.content.type !== 'deleted'}
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

    return (
      <div className={styles.avatar}>
        <PeerAvatar peer={sender} size={40} onClick={onClick} />
      </div>
    );
  }

  renderHeader() {
    const sender = this.getSender();
    if (!sender) {
      return null;
    }

    return (
      <header className={styles.header}>
        <PeerInfoTitle
          className={styles.peerInfo}
          info={sender}
          title={sender.title}
          userName={this.props.maxWidth > 300 ? sender.userName : null}
          titleClassName={styles.title}
          userNameClassName={styles.username}
          onTitleClick={this.props.onTitleClick ? this.handleTitleClick : null}
          onUserNameClick={this.props.onMentionClick ? this.handleMentionClick : null}
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
          size={22}
          onClick={this.handleForceSelect}
        />
      );
    }

    if (this.isHover() && renderActions) {
      return (
        <div className={styles.actions} id={`message_${this.props.message.rid}_actions`}>
          {renderActions()}
        </div>
      );
    }

    return null;
  }

  renderReactions() {
    const { message, users, onReaction } = this.props;

    if (
      !message.reactions ||
      !message.reactions.length ||
      !this.props.isReactionsEnabled ||
      !onReaction ||
      message.content.type === 'deleted'
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

    return (
      <div className={styles.reactions}>
        {children}
      </div>
    );
  }

  renderReply() {
    const { message: { content, attachment }, maxWidth, maxHeight } = this.props;
    if (attachment && attachment.type === 'reply' && content.type !== 'deleted') {
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
    const { message: { content, attachment }, maxWidth, maxHeight } = this.props;
    if (attachment && attachment.type === 'forward' && content.type !== 'deleted') {
      return (
        <MessageFlattenAttachment
          className={styles.forward}
          attachment={attachment}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          onForwardLightboxOpen={this.props.onForwardLightboxOpen}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
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
      short ? styles.short : null,
      hover ? styles.hover : null,
      isError ? styles.error : null,
      isUnread ? styles.unread : null,
      highlight ? styles.highlight : null,
      this.isSelectionMode() ? styles.selectable : null
    );

    const contentWrapperClassName = classNames(styles.content, styles[content.type]);

    return (
      <Hover id={`message_${rid}`} className={className} onHover={this.handleHover} onClick={this.handleSelect}>
        <CopyOnly block />
        {this.renderActions()}
        <div className={styles.info}>
          {short ? null : this.renderAvatar()}
          {short ? this.renderState() : null}
        </div>
        <div className={styles.body}>
          {short ? this.renderShortHeader() : this.renderHeader()}
          <div className={contentWrapperClassName}>
            {this.renderReply()}
            <MessageContent
              content={content}
              rid={rid}
              isPending={isPending}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              onLightboxOpen={this.props.onLightboxOpen ? this.handleLightboxOpen : undefined}
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
