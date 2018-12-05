/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, PeerInfo, Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import PeerAvatarDouble from '../PeerAvatarDouble/PeerAvatarDouble';
import MessagePreview from './MessagePreview/MessagePreview';
import Icon from '../Icon/Icon';
import styles from './SidebarRecentItem.css';

export type Props = {
  className?: string,
  uid: number,
  info: PeerInfo,
  muted: boolean,
  active: boolean,
  counter: number,
  draft: ?string,
  typing: ?string,
  online: ?boolean,
  message: ?Message,
  favourite: ?boolean,
  onSelect: (peer: Peer) => mixed,
};

class SidebarRecentItem extends PureComponent<Props> {
  handleClick = (): void => {
    this.props.onSelect(this.props.info.peer);
  };

  isDoubleAvatar(): boolean {
    const { info, message } = this.props;

    return Boolean(message && message.sender && info.type === 'group');
  }

  renderAvatar() {
    const { info, message, online } = this.props;

    if (message && message.sender && info.type === 'group') {
      return (
        <PeerAvatarDouble
          className={styles.avatar}
          size={37}
          big={info}
          small={message.sender}
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

  renderStatus() {
    const { uid, info, message, typing, draft, active } = this.props;

    if (typing) {
      return (
        <div className={styles.message}>
          <Spinner className={styles.typing} type="dotted" />
          <span className={styles.highlight}>{typing}</span>
        </div>
      );
    }

    if (draft) {
      return (
        <div className={styles.message}>
          <Text className={styles.draft} id="SidebarRecentItem.draft" />
          {draft}
        </div>
      );
    }

    if (message) {
      return (
        <MessagePreview
          className={styles.message}
          uid={uid}
          info={info}
          message={message}
          active={active}
        />
      );
    }

    return null;
  }

  renderCounter() {
    const { muted, counter } = this.props;

    if (counter === 0) {
      return null;
    }

    const className = classNames(styles.counter, muted ? styles.muted : null);

    return <div className={className}>{counter}</div>;
  }

  renderIcons() {
    const icons = [];
    if (this.props.favourite) {
      icons.push(
        <Icon
          key="favourite"
          glyph="star"
          className={styles.favIcon}
          size={16}
        />,
      );
    }

    switch (this.props.info.type) {
      case 'group':
        icons.push(
          <Icon
            key="type"
            glyph="group"
            className={styles.groupIcon}
            size={22}
          />,
        );
        break;

      case 'channel':
        icons.push(
          <Icon
            key="type"
            glyph="channel"
            className={styles.channelIcon}
            size={20}
          />,
        );
        break;

      default:
      // do nothing
    }

    return icons;
  }

  renderMuteIcon() {
    const { muted } = this.props;

    if (!muted) {
      return null;
    }

    return <Icon glyph="volume_off" className={styles.muteIcon} size={16} />;
  }

  render() {
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.active ? styles.active : null,
      this.props.counter ? styles.unread : null,
    );

    return (
      <div
        className={className}
        onClick={this.handleClick}
        id={`sidebar_recent_item_${this.props.info.peer.id}`}
      >
        {this.renderAvatar()}
        <div className={styles.text}>
          <div className={styles.header}>
            {this.renderIcons()}
            <PeerInfoTitle
              title={this.props.info.title}
              emojiSize={17}
              className={styles.title}
            />
            {this.renderMuteIcon()}
          </div>
          {this.renderStatus()}
        </div>
        {this.renderCounter()}
      </div>
    );
  }
}

export default SidebarRecentItem;
