/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Icon from '../Icon/Icon';
import styles from './ContactList.css';

export type Props = {
  value: boolean
};

function SelectSwitcher(props: Props) {
  if (props.value) {
    return (
      <div className={styles.selected}>
        <Icon className={styles.icon} glyph="done" />
      </div>
    );
  }

  return (
    <div className={styles.circle} />
  );
}

export default SelectSwitcher;
