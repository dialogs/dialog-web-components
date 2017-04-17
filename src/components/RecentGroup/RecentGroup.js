/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, ShortRecent } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { isSamePeer } from '@dlghq/dialog-types/utils';
import SidebarPeerItem from '../SidebarPeerItem/SidebarPeerItem';

export type Props = {
  className?: string,
  items: ShortRecent[],
  currentPeer: ?Peer,
  onSelect: Function
}

class RecentGroup extends PureComponent {
  props: Props;

  renderItems(): React.Element<any>[] {
    const { items, currentPeer, onSelect } = this.props;

    return items.map((item, index) => {
      const isActive = isSamePeer(currentPeer, item.peer.peer);

      return (
        <SidebarPeerItem
          key={index}
          info={item.peer}
          active={isActive}
          counter={item.counter}
          onSelect={onSelect}
        />
      );
    });
  }

  render(): React.Element<any> {
    const { className } = this.props;

    return (
      <div className={className}>
        {this.renderItems()}
      </div>
    );
  }
}

console.warn('RecentGroup component deprecated, and will be removed on near future.');

export default RecentGroup;
