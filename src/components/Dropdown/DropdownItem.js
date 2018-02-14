/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

export type Props = {
  children: Node,
  active?: boolean,
  id?: string,
  className?: string,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

function DropdownItem(props: Props) {
  const className = classNames(
    styles.item,
    props.className,
    props.active ? styles.active : null,
    props.onClick ? styles.hoverable : null
  );

  return (
    <div className={className} onClick={props.onClick} id={props.id}>
      <div className={styles.wrapper}>
        <span className={styles.text}>{props.children}</span>
      </div>
    </div>
  );
}

export default DropdownItem;
