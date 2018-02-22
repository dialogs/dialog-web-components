/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

type Props = {
  className?: string,
  children: React.Node
};

function DropdownHeader(props: Props) {
  const className = classNames(styles.header, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default DropdownHeader;
