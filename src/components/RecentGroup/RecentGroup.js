/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { Peer, PeerInfo } from '../../PropTypes';
import isSamePeer from '../../utils/isSamePeer';
import SidebarGroup from '../SidebarGroup/SidebarGroup';
import RecentItem from '../RecentItem/RecentItem';

class RecentGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      peer: PeerInfo.isRequired,
      counter: PropTypes.number.isRequired,
      text: PropTypes.string,
      typing: PropTypes.string
    })).isRequired,
    currentPeer: Peer,
    onSelect: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items ||
           nextProps.title !== this.props.title ||
           nextProps.currentPeer !== this.props.currentPeer ||
           nextProps.onSelect !== this.props.onSelect ||
           nextProps.className !== this.props.className;
  }

  renderItems() {
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

  render() {
    const { className, title } = this.props;

    return (
      <SidebarGroup className={className} title={title}>
        {this.renderItems()}
      </SidebarGroup>
    );
  }
}

export default RecentGroup;
