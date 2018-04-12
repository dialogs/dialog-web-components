/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message } from '@dlghq/dialog-types';
import type { ProviderContext } from '@dlghq/react-l10n';
import React, { Component } from 'react';
import classNames from 'classnames';
import { hasSelection } from '@dlghq/dialog-utils';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import TextMessagePreview from '../SidebarRecentItem/MessagePreview/TextMessagePreview';
import Icon from '../Icon/Icon';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import MessageContent from '../MessageContent/MessageContent';
import decorators from './utils/decorators';
import getLocalDateTimeFormat from '../../utils/getLocalDateTimeFormat';
import getLocalTimeFormat from '../../utils/getLocalTimeFormat';
import getDateFnsLocale from '../../utils/getDateFnsLocale';
import formatDate from 'date-fns/format';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  type: 'forward' | 'reply',
  message: Message,
  short: boolean,
  maxHeight: number,
  maxWidth: number,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (message: Message) => mixed,
  onLightboxOpen?: (message: Message) => mixed
};

class MessageAttachmentItem extends Component<Props> {
  context: ProviderContext;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  handleGoToPeer = (event: SyntheticEvent<>): void => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.message.sender) {
      this.props.onGoToPeer(this.props.message.sender.peer);
    }
  };

  handleGoToMessage = (event: SyntheticMouseEvent<>): void => {
    // $FlowFixMe
    if (event.target.tagName === 'A' || hasSelection()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.props.onGoToMessage(this.props.message);
  };

  handleLightboxOpen = (event: SyntheticMouseEvent<>): void => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onLightboxOpen) {
      this.props.onLightboxOpen(this.props.message);
    }
  };

  renderHeader() {
    const { message: { sender }, short, type } = this.props;

    if (short || !sender) {
      return null;
    }

    return (
      <header className={styles.header}>
        <Icon glyph={type} size={20} className={styles.icon} />
        <PeerInfoTitle
          className={styles.peerInfoTitle}
          title={sender.title}
          userName={sender.userName}
          titleClassName={styles.name}
          userNameClassName={styles.nick}
          onTitleClick={this.handleGoToPeer}
          onUserNameClick={this.handleGoToPeer}
          addSpacebars
          emojiSize={18}
        />
        {type === 'reply' ? this.renderTimestamp() : null}
      </header>
    );
  }

  renderTimestamp() {
    const { message } = this.props;
    const format = getLocalTimeFormat(this.context.l10n.locale);
    const locale = getDateFnsLocale(this.context.l10n.locale);

    return (
      <time className={styles.timestamp} dateTime={message.fullDate.toISOString()}>
        {formatDate(message.fullDate, format, locale)}
      </time>
    );
  }

  renderForwardTimestamp() {
    const { message } = this.props;
    const format = getLocalDateTimeFormat(this.context.l10n.locale);
    const locale = getDateFnsLocale(this.context.l10n.locale);

    return (
      <time className={styles.fulltime} dateTime={message.fullDate.toISOString()}>
        {formatDate(message.fullDate, format, locale)}
      </time>
    );
  }

  renderReply() {
    const { message: { content, rid }, maxWidth, maxHeight } = this.props;
    const className = classNames(styles.message, {
      [styles.replyContent]: content.type === 'text' || content.type === 'service'
    });

    switch (content.type) {
      case 'text':
        return (
          <div className={className}>
            <TextMessagePreview content={content} emojiSize={16} decorators={decorators} />
          </div>
        );

      case 'voice':
        return (
          <div className={className}>
            <Text id="MessageContent.voice" className={styles.messageType} />
          </div>
        );

      case 'video':
        return (
          <div className={className}>
            {content.preview ? (
              <div
                className={styles.preview}
                style={{ backgroundImage: `url(${content.preview})` }}
              />
            ) : (
              <Text id="MessageContent.video" className={styles.messageType} />
            )}
          </div>
        );

      case 'document':
        return (
          <div className={className}>
            <Text id="MessageContent.document" className={styles.messageType} />
          </div>
        );

      case 'location':
        return (
          <div className={className}>
            <Text id="MessageContent.location" className={styles.messageType} />
          </div>
        );

      case 'contact':
        return (
          <div className={className}>
            <Text id="MessageContent.contact" className={styles.messageType} />
          </div>
        );

      case 'photo':
        return (
          <div className={className}>
            {content.preview ? (
              <div
                className={styles.preview}
                style={{ backgroundImage: `url(${content.preview})` }}
              />
            ) : (
              <Text id="MessageContent.photo" className={styles.messageType} />
            )}
          </div>
        );

      default:
        return (
          <div className={className}>
            <MessageContent
              className={className}
              content={content}
              rid={rid}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
            />
          </div>
        );
    }
  }

  renderForward() {
    const { message: { content, rid }, maxWidth, maxHeight } = this.props;

    return (
      <MessageContent
        className={styles.message}
        content={content}
        rid={rid}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onLightboxOpen={this.handleLightboxOpen}
      />
    );
  }

  renderContent() {
    const { type } = this.props;

    switch (type) {
      case 'reply':
        return this.renderReply();

      case 'forward':
        return this.renderForward();

      default:
        return null;
    }
  }

  render() {
    const { short, type } = this.props;

    const className = classNames(
      styles.itemContainer,
      styles[type],
      {
        [styles.short]: short
      },
      this.props.className
    );

    return (
      <div className={className} onClick={this.handleGoToMessage}>
        {this.renderHeader()}
        <div className={styles.content}>
          <div className={styles.messageWrapper}>
            {this.renderContent()}
          </div>
          {type === 'forward' ? (
            <div className={styles.timeWrapper}>
              {this.renderForwardTimestamp()}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default MessageAttachmentItem;
