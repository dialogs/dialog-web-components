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
  const { className, onClick, children, active } = props;
  const dropdownItemClassName = classNames(styles.item, {
    [styles.hovered]: onClick,
    [styles.active]: active
  }, className);

  return (
    <div className={dropdownItemClassName} onClick={onClick}>
      <span className={styles.text}>{children}</span>
    </div>
  );
}

export default DropdownItem;
