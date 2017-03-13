/**
 * Copyright 2017 dialog LLC <info@dlg.im>
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
    <div className={styles.addMember}>
      <Icon glyph="plus_outline" className={styles.addMemberIcon} onClick={props.onClick} size={32} />
      <div className={styles.title}>
        <Text
          onClick={props.onClick}
          id="ActivityListMembers.add"
          className={styles.title}
          tagName="div"
        />
      </div>
    </div>
  );
}

export default ActivityListMembersAdd;
