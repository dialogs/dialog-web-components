/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './ActivityList.css';

export type ActivityListProps = {
  className?: string,
  children: Node
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
