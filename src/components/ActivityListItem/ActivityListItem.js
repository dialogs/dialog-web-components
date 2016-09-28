/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../ActivityList/ActivityList.css';

export type ActivityListItemProps = {
  className?: string,
  children?: any,
  onClick?: EventHandler
};

class ActivityListItem extends Component {
  props: ActivityListItemProps;

  shouldComponentUpdate(nextProps: ActivityListItemProps) {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className ||
           nextProps.onClick !== this.props.onClick;
  }

  render() {
    const { className, children, onClick } = this.props;
    const itemClassName = classNames(styles.item, className);

    return (
      <div className={itemClassName} onClick={onClick}>
        {children}
      </div>
    );
  }
}

export default ActivityListItem;
