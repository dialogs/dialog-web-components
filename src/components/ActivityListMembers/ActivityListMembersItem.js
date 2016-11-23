/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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

  handleKick = (): void => {
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
        <PeerAvatar
          className={styles.avatar}
          size="medium"
          peer={member.peerInfo}
          onClick={this.handleClick}
        />
        <div className={styles.title}>
          {member.peerInfo.title}
        </div>
        {this.renderKick()}
      </div>
    );
  }
}


export default ActivityListMembersItem;
