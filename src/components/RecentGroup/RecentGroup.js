/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './RecentGroup.css';
import { map } from 'lodash';
import RecentItem from '../RecentItem/RecentItem';

class RecentGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      peer: PropTypes.object.isRequired,
      counter: PropTypes.number.isRequired,
      lastMessage: PropTypes.string
    })).isRequired,
    onSelect: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items ||
           nextProps.title !== this.props.title ||
           nextProps.className !== this.props.className;
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <div className={styles.title}>{title}</div>
    );
  }

  renderItems() {
    const { items, onSelect } = this.props;

    return items.map((item, index) => (
      <RecentItem
        key={index}
        peer={item.peer}
        counter={item.counter}
        lastMessage={item.lastMessage}
        onSelect={onSelect}
      />
    ));
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
