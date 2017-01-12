/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './ActivityList.css';

export type ActivityListProps = {
  className?: string,
  children?: any
}

function ActivityList(props: ActivityListProps) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default ActivityList;
