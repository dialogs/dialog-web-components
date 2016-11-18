/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import styles from './SidebarGroup.css';

export type Props = {
  title: string
};

function SidebarGroupTitle(props: Props) {
  return (
    <header className={styles.title}>{props.title}</header>
  );
}

export default SidebarGroupTitle;
