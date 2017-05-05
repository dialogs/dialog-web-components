/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, GroupOnline } from '@dlghq/dialog-types';
import type { ChatMember } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ActivityListItem from '../ActivityList/ActivityListItem';
import ActivityListMembersItem from './ActivityListMembersItem';
import ActivityListMembersAdd from './ActivityListMembersAdd';
import Icon from '../Icon/Icon';
import styles from './ActivityListMembers.css';

export type Props = {
  className?: string,
  uid: number,
  members: ChatMember[],
  online: GroupOnline,
  onMemberAdd: () => void,
  onMemberKick: (peer: Peer) => void,
  onMemberClick: (peer: Peer) => void
};

export type State = {
  isOpen: boolean
};

class ActivityListMembers extends PureComponent {
  props: Props;
  state: State;

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

  renderHeader(): React.Element<any> {
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
      <ActivityListItem className={styles.header} onClick={this.handleMembersHeaderClick}>
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

  renderMembersList(): React.Element<any>[] {
    const { members, uid } = this.props;

    return members.map((member) => {
      return (
        <ActivityListMembersItem
          uid={uid}
          member={member}
          key={member.peerInfo.peer.key}
          onKick={this.props.onMemberKick}
          onClick={this.props.onMemberClick}
        />
      );
    });
  }


  renderMembers(): ?React.Element<any> {
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

  render(): React.Element<any> {
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
