/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

type Props = {
  className?: string,
  children?: mixed
};

function DropdownHeader(props: Props): React.Element<any> {
  const className = classNames(styles.header, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
}

export default DropdownHeader;
