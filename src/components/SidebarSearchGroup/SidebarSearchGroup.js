/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { PeerInfo } from '../../PropTypes';
import SidebarGroup from '../SidebarGroup/SidebarGroup';
import RecentItem from '../RecentItem/RecentItem';

class SidebarSearchGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PeerInfo).isRequired,
    onSelect: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items ||
           nextProps.title !== this.props.title ||
           nextProps.onSelect !== this.props.onSelect ||
           nextProps.className !== this.props.className;
  }

  renderItems() {
    const { items, onSelect } = this.props;

    return items.map((item, index) => {
      return (
        <RecentItem
          key={index}
          info={item.peerInfo}
          active={false}
          counter={0}
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

export default SidebarSearchGroup;
