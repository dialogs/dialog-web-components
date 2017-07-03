/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

export type Props = {
  children?: any,
  active?: boolean,
  className?: string,
  onClick?: (event: SyntheticMouseEvent) => void
};

function DropdownItem(props: Props) {
  const className = classNames(
    styles.item,
    props.className,
    props.active ? styles.active : null,
    props.onClick ? styles.hovered : null
  );

  return (
    <div className={className} onClick={props.onClick}>
      <span className={styles.text}>{props.children}</span>
    </div>
  );
}

export default DropdownItem;
