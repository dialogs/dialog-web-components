/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';

import React from 'react';
import classNames from 'classnames';
import SelectList from '../SelectList/SelectList';
import ContactListItem from './ContactListItem';
import styles from './ContactList.css';

export type Props = {
  className?: string,
  selector: SelectorState<Contact>,
  onChange: (selector: SelectorState<Contact>) => void
};

function ContactList(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={styles.list}>
      <SelectList
        className={className}
        width={500}
        itemHeight={72}
        itemVisibleCount={5.5}
        selector={props.selector}
        onChange={props.onChange}
        renderItem={ContactListItem.render}
      />
    </div>
  );
}

export default ContactList;
