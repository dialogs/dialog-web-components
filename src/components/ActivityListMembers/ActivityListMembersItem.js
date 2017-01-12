/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import type { ChatMember } from './types';
import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import ActivityListMembersKick from './ActivityListMembersKick';
import styles from './ActivityListMembers.css';

export type Props = {
  member: ChatMember,
  onKick: (peer: Peer) => void,
  onClick: (peer: Peer) => void
}

class ActivityListMembersItem extends PureComponent {
  props: Props;

  handleKick = (event: $FlowIssue): void => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onKick(this.props.member.peerInfo.peer);
  };

  handleClick = (): void => {
    this.props.onClick(this.props.member.peerInfo.peer);
  };

  renderKick(): ?React.Element<any> {
    const { member } = this.props;
    if (!member.canKick) {
      return null;
    }

    return (
      <ActivityListMembersKick
        error={member.kickState.error}
        pending={member.kickState.pending}
        onClick={this.handleKick}
      />
    );
  }

  render(): React.Element<any> {
    const { member } = this.props;

    return (
      <div className={styles.member}>
        <div className={styles.avatarBlock}>
          <PeerAvatar
            onClick={this.handleClick}
            className={styles.avatar}
            size="medium"
            peer={member.peerInfo}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.title} onClick={this.handleClick}>{member.peerInfo.title}</div>
        </div>
        {this.renderKick()}
      </div>
    );
  }
}


export default ActivityListMembersItem;
