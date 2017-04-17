/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { Peer, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './SidebarPeerItem.css';
import PeerAvatar from '../PeerAvatar/PeerAvatar';

export type Props = {
  className?: string,
  info: PeerInfo,
  active: boolean,
  counter: number,
  online?: ?boolean,
  onSelect: (peer: Peer) => any
};

class SidebarPeerItem extends PureComponent {
  props: Props;

  static defaultProps = {
    counter: 0,
    active: false
  };

  handleClick = (): void => {
    const { info: { peer }, onSelect } = this.props;

    onSelect(peer);
  };

  render() {
    const { active, counter, info, online } = this.props;
    const className = classNames(styles.container, {
      [styles.active]: active,
      [styles.unread]: counter !== 0
    }, this.props.className);

    return (
      <div className={className} onClick={this.handleClick}>
        <PeerAvatar
          className={styles.avatar}
          peer={info}
          online={online}
        />
        <div className={styles.text}>
          <div className={styles.title}>{info.title}</div>
        </div>
        {counter > 0 ? (
          <div className={styles.counter}>{counter}</div>
        ) : null}
      </div>
    );
  }
}

export default SidebarPeerItem;
