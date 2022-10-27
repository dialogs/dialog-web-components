/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { Contact } from '@dlghq/dialog-types';
import React from 'react';
import ContactSelector from '../ContactSelector/ContactSelector';
import styles from './CreateNewModal.css';

export type Props = {
  autoFocus: boolean,
  members: SelectorState<Contact>,
  onChange: (members: SelectorState<Contact>) => any,
}

function CreateNewMembers(props: Props) {
  return (
    <div className={styles.members}>
      <ContactSelector
        autoFocus={props.autoFocus}
        selector={props.members}
        onChange={props.onChange}
      />
    </div>
  );
}

export default CreateNewMembers;
