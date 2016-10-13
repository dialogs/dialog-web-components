/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { GroupMember } from '@dlghq/dialog-types';
import React from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './ActivityListMembers.css';

export type Props = {
  member: GroupMember
}

function ActivityListMembersItem(props: Props): React.Element<any> {
  return (
    <div className={styles.member}>
      <PeerAvatar peer={props.member.peerInfo} size="medium" className={styles.avatar} />
      <div className={styles.title}>{props.member.peerInfo.title}</div>
    </div>
  );
}


export default ActivityListMembersItem;
