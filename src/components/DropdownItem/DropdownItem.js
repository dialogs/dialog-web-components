/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from '../Dropdown/Dropdown.css';

export type Props = {
  children?: any,
  active?: boolean,
  className?: string,
  onClick?: () => void
};

function DropdownItem(props: Props): React.Element<any> {
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
