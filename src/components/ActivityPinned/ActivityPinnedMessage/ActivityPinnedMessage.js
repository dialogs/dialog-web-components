/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo, Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import MessageContent from '../../MessageContent/MessageContent';
import Icon from '../../Icon/Icon';
import styles from './ActivityPinnedMessage.css';

type Props = {
  className?: string,
  info: PeerInfo,
  message: Message,
  onGoToPeer?: (peer: Peer) => mixed,
  onGoToMessage?: (peer: Peer, message: Message) => mixed,
  onDeleteMessage?: (message: Message) => mixed,
  onLightboxOpen?: (message: Message) => mixed
};

class ActivityPinnedMessage extends PureComponent<Props> {
  handleGoToPeer = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    const sender = this.getSender();
    if (this.props.onGoToPeer) {
      this.props.onGoToPeer(sender.peer);
    }
  };

  handleGoToMessage = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onGoToMessage) {
      this.props.onGoToMessage(this.props.info.peer, this.props.message);
    }
  };

  handleRemoveFromPin = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onDeleteMessage) {
      this.props.onDeleteMessage(this.props.message);
    }
  };

  handleLightboxOpen = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onLightboxOpen) {
      this.props.onLightboxOpen(this.props.message);
    }
  };

  getSender(): PeerInfo {
    return this.props.message.sender || this.props.info;
  }

  renderRemoveButton() {
    if (!this.props.onDeleteMessage) {
      return null;
    }

    return <Icon glyph="close" size={16} onClick={this.handleRemoveFromPin} className={styles.remove} />;
  }

  render() {
    const { message } = this.props;
    const className = classNames(
      styles.container,
      {
        [styles.clickable]: this.props.onGoToMessage
      },
      this.props.className
    );

    const sender = this.getSender();

    return (
      <div className={className} onClick={this.handleGoToMessage}>
        <PeerAvatar
          className={styles.avatar}
          peer={sender}
          size={30}
          onClick={this.props.onGoToPeer ? this.handleGoToPeer : undefined}
        />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <PeerInfoTitle
              className={styles.title}
              title={sender.title}
              onTitleClick={this.props.onGoToPeer ? this.handleGoToPeer : undefined}
              emojiSize={20}
            />
            <time className={styles.time} dateTime={message.fullDate.toISOString()}>
              {message.date}
            </time>
            {this.renderRemoveButton()}
          </div>
          <div className={styles.contentWrapper}>
            <MessageContent
              className={styles.content}
              rid={message.rid}
              content={message.content}
              onLightboxOpen={this.props.onLightboxOpen ? this.handleLightboxOpen : undefined}
              maxHeight={100}
              maxWidth={248}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityPinnedMessage;
