/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, PeerInfo, Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import DoublePeerAvatar from '../DoublePeerAvatar/DoublePeerAvatar';
import Icon from '../Icon/Icon';
import styles from './FullRecentItem.css';

export type Props = {
  className?: string,
  uid: number,
  info: PeerInfo,
  active: boolean,
  counter: number,
  typing: ?string,
  online: ?boolean,
  message: ?Message,
  favourite: ?boolean,
  onSelect: (peer: Peer) => any
};

function getSenderTitle(title: string): string {
  return title.split(' ')[0];
}

class FullRecentItem extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onSelect(this.props.info.peer);
  };

  renderAvatar(): React.Element<any> {
    const { info, message, online } = this.props;

    if (message && message.sender && info.type === 'group') {
      return (
        <DoublePeerAvatar
          className={styles.doubleAvatar}
          size={40}
          peerBig={info}
          peerSmall={message.sender}
        />
      );
    }

    return (
      <PeerAvatar
        className={styles.avatar}
        size={37}
        peer={info}
        online={online}
      />
    );
  }

  renderStatusSender() {
    const { uid, info, message } = this.props;
    if (message && message.sender) {
      if (uid === message.sender.peer.id) {
        return (
          <Text className={styles.sender} id="FullRecentItem.you" />
        );
      }

      if (info.type === 'group') {
        const title = getSenderTitle(message.sender.title);

        return (
          <span className={styles.sender}>
            {title + ': '}
          </span>
        );
      }
    }

    return null;
  }

  renderStatus() {
    const { message, typing } = this.props;
    if (typing) {
      return (
        <div className={styles.message}>
          <Spinner className={styles.typing} type="dotted" />
          <span className={styles.highlight}>
            {typing}
          </span>
        </div>
      );
    }

    if (message) {
      const { content } = message;

      switch (content.type) {
        case 'text':
          return (
            <div className={styles.message}>
              {this.renderStatusSender()}
              {content.text}
            </div>
          );

        case 'service':
          return (
            <div className={styles.message}>
              <span className={styles.service}>
                {content.text}
              </span>
            </div>
          );

        case 'unsupported':
          return null;

        default:
          return (
            <div className={styles.message}>
              {this.renderStatusSender()}
              <Text
                className={styles.highlight}
                id={`FullRecentItem.${content.type}`}
              />
            </div>
          );
      }
    }

    return null;
  }

  renderCounter() {
    const { counter } = this.props;

    if (counter === 0) {
      return null;
    }

    return (
      <div className={styles.counter}>
        {counter}
      </div>
    );
  }

  renderIcons() {
    const icons = [];
    if (this.props.favourite) {
      icons.push(
        <Icon key="favourite" glyph="star" className={styles.icon} size={14} />
      );
    }

    switch (this.props.info.type) {
      case 'group':
        icons.push(
          <Icon key="type" glyph="group" className={styles.icon} size={22} />
        );
        break;

      case 'channel':
        icons.push(
          <Icon key="type" glyph="channel" className={styles.icon} size={22} />
        );
        break;

      default:
        // do nothing
    }

    return icons;
  }

  render() {
    const { info, message, active, counter } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.active]: active,
      [styles.unread]: counter !== 0,
      [styles.withDoubleAvatar]: message && message.sender && info.type === 'group'
    });

    return (
      <div className={className} onClick={this.handleClick}>
        {this.renderAvatar()}
        <div className={styles.text}>
          <div className={styles.title}>
            {this.renderIcons()}
            <span>{info.title}</span>
          </div>
          {this.renderStatus()}
        </div>
        {this.renderCounter()}
      </div>
    );
  }
}

export default FullRecentItem;
