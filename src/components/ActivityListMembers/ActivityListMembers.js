/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Group, GroupOnline } from '@dlghq/dialog-types';
import type { ChatMember } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { peerToString } from '@dlghq/dialog-types/utils';
import { hasPermission } from '../../utils/acl';
import ActivityListItem from '../ActivityList/ActivityListItem';
import ActivityListMembersItem from './ActivityListMembersItem';
import ActivityListMembersAdd from './ActivityListMembersAdd';
import Icon from '../Icon/Icon';
import styles from './ActivityListMembers.css';

export type Props = {
  className?: string,
  uid: number,
  group: Group,
  members: ChatMember[],
  online: GroupOnline,
  onMemberAdd: () => void,
  onMemberKick: (peer: Peer) => void,
  onMemberClick: (peer: Peer) => void
};

export type State = {
  isOpen: boolean
};

class ActivityListMembers extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.online.isNotMember) {
      this.setState({ isOpen: false });
    }
  }

  handleMembersHeaderClick = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getSelfPermissions() {
    const { uid, members } = this.props;
    const self = members.find((member) => uid === member.peerInfo.peer.id);

    return self ? self.permissions : [];
  }

  renderHeader() {
    const { online } = this.props;

    if (online.isNotMember) {
      return (
        <ActivityListItem className={styles.header}>
          <Icon
            glyph="person"
            inverted
            theme="warning"
            className={styles.icon}
            size={28}
          />
          <div className={styles.text}>{online.message}</div>
        </ActivityListItem>
      );
    }

    const { isOpen } = this.state;
    const arrowGlyph = isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    return (
      <ActivityListItem className={styles.header} onClick={this.handleMembersHeaderClick} id="activity_list_members">
        <Icon
          glyph="person"
          inverted
          theme="warning"
          className={styles.icon}
          size={28}
        />
        <div className={styles.text}>{online.message}</div>
        <Icon glyph={arrowGlyph} className={styles.arrow} />
      </ActivityListItem>
    );
  }

  renderMembersList() {
    const { uid, group, members } = this.props;

    const canKick = hasPermission(uid, group, 'kick');
    const permissions = this.getSelfPermissions();

    return members.map((member) => {
      return (
        <ActivityListMembersItem
          uid={uid}
          group={group}
          member={member}
          canKick={canKick}
          permissions={permissions}
          key={peerToString(member.peerInfo.peer)}
          onKick={this.props.onMemberKick}
          onClick={this.props.onMemberClick}
        />
      );
    });
  }


  renderMembers() {
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <ActivityListItem className={styles.members}>
        <ActivityListMembersAdd onClick={this.props.onMemberAdd} />
        {this.renderMembersList()}
      </ActivityListItem>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderHeader()}
        {this.renderMembers()}
      </div>
    );
  }
}

export default ActivityListMembers;
