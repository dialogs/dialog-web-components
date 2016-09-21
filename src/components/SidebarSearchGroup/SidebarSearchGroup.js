/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, SearchEntity } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import { peerToString } from '@dlghq/dialog-types/utils';
import SidebarGroup from '../SidebarGroup/SidebarGroup';
import RecentItem from '../RecentItem/RecentItem';

export type SidebarSearchGroupProps = {
  className?: string,
  title: string,
  items: SearchEntity[],
  onSelect: (peer: Peer) => any
};

class SidebarSearchGroup extends Component {
  props: SidebarSearchGroupProps;

  shouldComponentUpdate(nextProps: SidebarSearchGroupProps) {
    return nextProps.items !== this.props.items ||
           nextProps.title !== this.props.title ||
           nextProps.className !== this.props.className;
  }

  renderItems() {
    const { items, onSelect } = this.props;

    return items.map(({ peerInfo }) => (
      <RecentItem
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
      <SidebarGroup className={className} title={title}>
        {this.renderItems()}
      </SidebarGroup>
    );
  }
}

export default SidebarSearchGroup;
