/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Permission } from './types';
import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Switcher from '../Switcher/Switcher';
import styles from './AdminModal.css';

type Props = {
  id: string,
  label: string,
  type: Permission,
  danger?: ?boolean,
  hintYes?: ?string,
  hintNo?: ?string,
  value: boolean,
  disabled?: boolean,
  onChange: (value: boolean, event: SyntheticInputEvent<>) => mixed
};

function AdminModalSwitcher(props: Props) {
  return (
    <div className={styles.switcherWrapper}>
      <Switcher
        className={styles.switcher}
        id={`${props.id}_${props.type}`}
        name={props.type}
        hint={props.value ? props.hintYes : props.hintNo}
        danger={props.danger === true}
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
      />
    </div>
  );
}

export default AdminModalSwitcher;
