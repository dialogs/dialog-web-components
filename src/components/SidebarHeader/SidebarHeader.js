/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './SidebarHeader.css';

export type Props = {
  className?: string,
  children?: any
};

function SidebarHeader(props: Props): React.Element<any> {
  const className = classNames(styles.container, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
}

export default SidebarHeader;
