/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './SidebarGroup.css';

export type Props = {
  title: string
};

function SidebarGroupTitle(props: Props) {
  return (
    <Text className={styles.title} id={props.title} tagName="header" />
  );
}

export default SidebarGroupTitle;
