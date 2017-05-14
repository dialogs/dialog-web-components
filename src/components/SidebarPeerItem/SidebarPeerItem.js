/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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
    const className = classNames(styles.container, this.props.className, {
      [styles.active]: active,
      [styles.unread]: counter !== 0
    });

    return (
      <div className={className} onClick={this.handleClick}>
        <PeerAvatar
          className={styles.avatar}
          peer={info}
          online={online}
        />
        <div className={styles.text}>
          <PeerInfoTitle title={info.title} titleClassName={styles.title} />
        </div>
        {counter > 0 ? (
          <div className={styles.counter}>{counter}</div>
        ) : null}
      </div>
    );
  }
}

export default SidebarPeerItem;
