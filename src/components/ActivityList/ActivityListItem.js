/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './ActivityList.css';

export type Props = {
  id?: string,
  className?: string,
  children?: any,
  onClick?: (event: SyntheticMouseEvent<>) => any
};

function ActivityListItem(props: Props) {
  const className = classNames(styles.item, {
    [styles.clickable]: props.onClick
  }, props.className);

  return (
    <div className={className} onClick={props.onClick} id={props.id}>
      {props.children}
    </div>
  );
}


export default ActivityListItem;
