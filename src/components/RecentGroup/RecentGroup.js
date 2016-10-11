/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import isSamePeer from '../../utils/isSamePeer';
import SidebarGroup from '../SidebarGroup/SidebarGroup';
import RecentItem from '../RecentItem/RecentItem';
import type { Peer, Recent } from '@dlghq/dialog-types';

export type Props = {
  className?: string,
  title: string,
  items: Recent[],
  currentPeer: Peer,
  onSelect: Function
}

class RecentGroup extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.items !== this.props.items ||
           nextProps.title !== this.props.title ||
           nextProps.currentPeer !== this.props.currentPeer ||
           nextProps.onSelect !== this.props.onSelect ||
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
          text={item.text}
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
