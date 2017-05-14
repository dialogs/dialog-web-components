/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import type { ChatMember } from './types';
import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import ActivityListMembersKick from './ActivityListMembersKick';
import styles from './ActivityListMembers.css';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';

export type Props = {
  uid: number,
  member: ChatMember,
  onKick: (peer: Peer) => void,
  onClick: (peer: Peer) => void
};

class ActivityListMembersItem extends PureComponent {
  props: Props;

  handleKick = (event: SyntheticMouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onKick(this.props.member.peerInfo.peer);
  };

  handleClick = (): void => {
    this.props.onClick(this.props.member.peerInfo.peer);
  };

  renderKick(): ?React.Element<any> {
    const { member, uid } = this.props;
    if (!member.canKick || member.isAdmin || uid === member.peerInfo.peer.id) {
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
          <PeerInfoTitle
            title={member.peerInfo.title}
            titleClassName={styles.title}
            onTitleClick={this.handleClick}
          />
        </div>
        {this.renderKick()}
      </div>
    );
  }
}


export default ActivityListMembersItem;
