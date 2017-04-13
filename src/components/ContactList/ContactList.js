/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';

import React from 'react';
import classNames from 'classnames';
import SelectList from '../SelectList/SelectList';
import ContactListItem from './ContactListItem';
import styles from './ContactList.css';

export type Props = {
  className?: string,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => void
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
