/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './Dropdown.css';

type Props = {
  className?: string
};

function DropdownDivider(props: Props): React.Element<any> {
  const className = classNames(styles.divider, props.className);

  return (
    <div className={className} />
  );
}

export default DropdownDivider;
