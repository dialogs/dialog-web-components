/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './ActivityList.css';

export type Props = {
  className?: string,
  children?: any,
  onClick?: (event: SyntheticMouseEvent) => any
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
