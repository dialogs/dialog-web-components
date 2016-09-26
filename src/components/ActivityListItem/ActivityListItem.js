/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../ActivityList/ActivityList.css';

class ActivityListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className ||
           nextProps.onClick !== this.props.onClick;
  }

  render() {
    const { className, children, onClick } = this.props;
    const itemClassName = classNames(styles.item, className);

    return (
      <div className={itemClassName} onClick={onClick}>
        <div className={styles.itemWrapper}>
          {children}
        </div>
      </div>
    );
  }
}

export default ActivityListItem;
