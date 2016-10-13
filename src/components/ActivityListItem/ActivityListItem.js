/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../ActivityList/ActivityList.css';

export type Props = {
  className?: string,
  children?: any,
  onClick?: EventHandler
};

function ActivityListItem(props: Props): React.Element<any> {
  const className = classNames(styles.item, {
    [styles.clickable]: props.onClick
  }, props.className);

  return (
    <div className={className} onClick={props.onClick}>{props.children}</div>
  );
}


export default ActivityListItem;
