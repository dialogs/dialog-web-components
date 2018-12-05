/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';
import React, { type Node } from 'react';
import classNames from 'classnames';
import SelectList from '../SelectList/SelectList';
import ContactListItem from './ContactListItem';
import styles from './ContactList.css';

export type Props = {
  className?: string,
  width: number,
  itemHeight: number,
  itemVisibleCount: number,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
  renderEmpty?: () => Node,
};

function ContactList(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={styles.list}>
      <SelectList
        className={className}
        width={props.width}
        itemHeight={props.itemHeight}
        itemVisibleCount={props.itemVisibleCount}
        selector={props.selector}
        onChange={props.onChange}
        renderItem={ContactListItem.render}
        renderEmpty={props.renderEmpty}
      />
    </div>
  );
}

ContactList.defaultProps = {
  width: 500,
  itemHeight: 60,
  itemVisibleCount: 7.5,
};

export default ContactList;
