/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo, Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import MessageContent from '../../MessageContent/MessageContent';
import Icon from '../../Icon/Icon';
import styles from './SidebarSearchItemMessage.css';

type Props = {
  className?: string,
  highlighted: boolean,
  short: boolean,
  collapsed: boolean,
  info: PeerInfo,
  message: Message,
  onGoToPeer?: (peer: Peer) => mixed,
  onGoToMessage?: (peer: Peer, message: Message) => mixed
};

class SidebarSearchItemMessage extends PureComponent {
  props: Props;

  handleGoToPeer = (event: SyntheticMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const sender = this.getSender();
    if (this.props.onGoToPeer) {
      this.props.onGoToPeer(sender.peer);
    }
  };

  handleGoToMessage = (event: SyntheticMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.onGoToMessage) {
      this.props.onGoToMessage(this.props.info.peer, this.props.message);
    }
  };

  getSender(): PeerInfo {
    return this.props.message.sender || this.props.info;
  }

  renderCollapseToggler() {
    const { collapsed, highlighted } = this.props;

    if (!highlighted) {
      return null;
    }

    return (
      <Icon
        glyph={collapsed ? 'expand' : 'collapse'}
        size={14}
        className={styles.collapser}
      />
    );
  }

  render() {
    const { highlighted, short, message } = this.props;
    const className = classNames(styles.container, {
      [styles.highlighted]: highlighted,
      [styles.short]: short
    }, this.props.className);

    const sender = this.getSender();

    return (
      <div className={className}>
        <PeerAvatar
          className={styles.avatar}
          peer={sender}
          size={28}
          onClick={this.handleGoToPeer}
        />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.title}>
              <PeerInfoTitle
                title={sender.title}
                onTitleClick={this.handleGoToPeer}
              />
            </div>
            <time
              className={styles.time}
              dateTime={message.fullDate.toISOString()}
              onClick={this.handleGoToMessage}
            >
              {message.date}
            </time>
            {this.renderCollapseToggler()}
          </div>
          <div className={styles.contentWrapper}>
            <MessageContent
              className={styles.content}
              rid={message.rid}
              content={message.content}
              maxHeight={100}
              maxWidth={300}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarSearchItemMessage;
