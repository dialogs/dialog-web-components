/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, SearchEntity } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { peerToString } from '@dlghq/dialog-types/utils';
import SidebarPeerItem from '../SidebarPeerItem/SidebarPeerItem';

export type SidebarSearchGroupProps = {
  className?: string,
  title: string,
  items: SearchEntity[],
  onSelect: (peer: Peer) => any
};

class SidebarSearchGroup extends PureComponent {
  props: SidebarSearchGroupProps;

  renderItems() {
    const { items, onSelect } = this.props;

    return items.map(({ peerInfo }) => (
      <SidebarPeerItem
        key={peerToString(peerInfo.peer)}
        info={peerInfo}
        active={false}
        counter={0}
        onSelect={onSelect}
      />
    ));
  }

  render() {
    const { className, title } = this.props;

    return (
      <div className={className} title={title}>
        {this.renderItems()}
      </div>
    );
  }
}

export default SidebarSearchGroup;
