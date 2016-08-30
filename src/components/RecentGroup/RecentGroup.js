/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './RecentGroup.css';
import RecentItem from '../RecentItem/RecentItem';

class RecentGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      peerInfo: PropTypes.shape({
        peer: PropTypes.shape({
          id: PropTypes.number.isRequired,
          type: PropTypes.oneOf(['user', 'group']).isRequired
        }).isRequired,
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        image: PropTypes.string
      }).isRequired,
      active: PropTypes.bool.isRequired,
      counter: PropTypes.number.isRequired,
      text: PropTypes.string,
      typing: PropTypes.string
    })).isRequired,
    currentPeer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['user', 'group']).isRequired
    }),
    onSelect: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items ||
           nextProps.title !== this.props.title ||
           nextProps.currentPeer !== this.props.currentPeer ||
           nextProps.onSelect !== this.props.onSelect ||
           nextProps.className !== this.props.className;
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <div className={styles.title}>{title}</div>
    );
  }

  renderItems() {
    const { items, currentPeer, onSelect } = this.props;

    return items.map((item, index) => {
      const isActive = currentPeer.id === item.peerInfo.peer.id;

      return (
        <RecentItem
          key={index}
          peerInfo={item.peerInfo}
          active={isActive}
          counter={item.counter}
          text={item.text}
          onSelect={onSelect}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.root, this.props.className);

    return (
      <div className={className}>
        {this.renderTitle()}
        {this.renderItems()}
      </div>
    );
  }
}

export default RecentGroup;
