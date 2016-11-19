/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Icon from '../Icon/Icon';
import { Text } from '@dlghq/react-l10n';
import styles from './ActivityListMembers.css';

export type Props = {
  onClick: () => void
};

function ActivityListMembersAdd(props: Props) {
  return (
    <div onClick={props.onClick} className={styles.addMember}>
      <Icon glyph="add" className={styles.addMemberIcon} />
      <Text
        id="ActivityListMembers.add"
        className={styles.title}
        tagName="div"
      />
    </div>
  );
}

export default ActivityListMembersAdd;
