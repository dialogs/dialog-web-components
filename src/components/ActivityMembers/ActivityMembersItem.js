/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { GroupMember } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './ActivityMembers.css';

export type ActivityMembersItemProps = {
  member: GroupMember
}

class ActivityMembersItem extends Component {
  props: ActivityMembersItemProps;

  shouldComponentUpdate(nextProps: ActivityMembersItemProps) {
    return nextProps.member !== this.props.member;
  }

  render() {
    const { member } = this.props;

    return (
      <div className={styles.member}>
        <PeerAvatar peer={member.peerInfo} size="medium" className={styles.avatar} />
        <div className={styles.title}>{member.peerInfo.title}</div>
      </div>
    );
  }
}

export default ActivityMembersItem;
