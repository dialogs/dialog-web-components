/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import type { GroupMember } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import ActivityListMembersKick from './ActivityListMembersKick';
import styles from './ActivityListMembers.css';

export type Props = {
  member: GroupMember & {
    kickState: {
      pending: boolean,
      error: ?string
    }
  },
  onMemberKick: () => void
}

class ActivityListMembersItem extends PureComponent {
  props: Props;

  renderKick(): ?React.Element<any> {
    if (!this.props.member.canKick) {
      return null;
    }

    return (
      <ActivityListMembersKick
        onClick={this.props.onMemberKick}
        pending={this.props.member.kickState.pending}
        error={this.props.member.kickState.error}
      />
    );
  }

  render(): React.Element<any> {
    return (
      <div className={styles.member}>
        <PeerAvatar peer={this.props.member.peerInfo} size="medium" className={styles.avatar} />
        <div className={styles.title}>{this.props.member.peerInfo.title}</div>
        {this.renderKick()}
      </div>
    );
  }
}


export default ActivityListMembersItem;
