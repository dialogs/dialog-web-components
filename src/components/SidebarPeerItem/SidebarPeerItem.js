/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './SidebarPeerItem.css';

export type Props = {
  className?: string,
  info: PeerInfo,
  active: boolean,
  counter: number,
  online?: ?boolean,
  onSelect: (peer: Peer) => mixed,
};

class SidebarPeerItem extends PureComponent<Props> {
  static defaultProps = {
    counter: 0,
    active: false,
  };

  handleClick = (): void => {
    this.props.onSelect(this.props.info.peer);
  };

  renderCounter() {
    const { counter } = this.props;
    if (counter > 0) {
      return <div className={styles.counter}>{counter}</div>;
    }

    return null;
  }

  render() {
    const { active, counter, info, online } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.active]: active,
      [styles.unread]: counter !== 0,
    });

    return (
      <div
        className={className}
        onClick={this.handleClick}
        id={`sidebar_peer_item_${info.peer.id}`}
      >
        <PeerAvatar
          className={styles.avatar}
          peer={info}
          online={online}
          size={32}
        />
        <div className={styles.text}>
          <PeerInfoTitle
            title={info.title}
            titleClassName={styles.title}
            emojiSize={15}
          />
        </div>
        {this.renderCounter()}
      </div>
    );
  }
}

export default SidebarPeerItem;
