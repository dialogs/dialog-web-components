/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './SidebarHeader.css';

export type Props = {
  className?: string,
  children: Node
};

function SidebarHeader(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
}

export default SidebarHeader;
