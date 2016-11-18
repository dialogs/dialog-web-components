/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Icon from '../Icon/Icon';
import styles from './ActivityListMembers.css';

export type Props = {
  onClick: () => void
};

function ActivityListMembersAdd(props: Props) {
  return (
    <div onClick={props.onClick} className={styles.addMember}>
      <Icon glyph="add" className={styles.addMemberIcon}/>
      <div className={styles.title}>Add member</div>
    </div>
  );
}

export default ActivityListMembersAdd;
