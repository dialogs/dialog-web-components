/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, ShortRecent } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import { isSamePeer } from '@dlghq/dialog-types/utils';
import SidebarGroup from '../SidebarGroup/SidebarGroup';
import RecentItem from '../RecentItem/RecentItem';

export type Props = {
  className?: string,
  title: string,
  items: ShortRecent[],
  currentPeer: ?Peer,
  onSelect: Function
}

class RecentGroup extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.items !== this.props.items ||
           nextProps.currentPeer !== this.props.currentPeer ||
           nextProps.title !== this.props.title ||
           nextProps.className !== this.props.className;
  }

  renderItems(): React.Element<any>[] {
    const { items, currentPeer, onSelect } = this.props;

    return items.map((item, index) => {
      const isActive = isSamePeer(currentPeer, item.peer.peer);

      return (
        <RecentItem
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
    const { className, title } = this.props;

    return (
      <SidebarGroup className={className} title={title}>
        {this.renderItems()}
      </SidebarGroup>
    );
  }
}

export default RecentGroup;
