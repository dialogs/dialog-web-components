/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { GroupMember, GroupOnline } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ActivityListItem from '../ActivityListItem/ActivityListItem';
import ActivityMembersItem from './ActivityMembersItem';
import Icon from '../Icon/Icon';
import styles from './ActivityMembers.css';


export type ActivityMembersProps = {
  className?: string,
  members: GroupMember[],
  online: GroupOnline
};

export type ActivityMembersState = {
  isOpen: boolean
};

class ActivityMembers extends Component {
  props: ActivityMembersProps;
  state: ActivityMembersState;
  handleMembersHeaderClick: EventHandler;

  constructor(props: ActivityMembersProps) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleMembersHeaderClick = this.handleMembersHeaderClick.bind(this);
  }

  componentWillReceiveProps(nextProps: ActivityMembersProps): void {
    if (nextProps.online.isNotMember) {
      this.setState({ isOpen: false });
    }
  }

  shouldComponentUpdate(nextProps: ActivityMembersProps, nextState: ActivityMembersState) {
    return nextState.isOpen !== this.state.isOpen ||
           nextProps.members !== this.props.members ||
           nextProps.online !== this.props.online ||
           nextProps.className !== this.props.className;
  }

  handleMembersHeaderClick(): void {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderHeader() {
    const { online } = this.props;

    if (online.isNotMember) {
      return (
        <ActivityListItem className={styles.header}>
          <Icon glyph="person" inverted theme="warning" className={styles.icon} />
          <div className={styles.text}>{online.message}</div>
        </ActivityListItem>
      );
    }

    const { isOpen } = this.state;
    const arrowGlyph = isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    return (
      <ActivityListItem className={styles.header} onClick={this.handleMembersHeaderClick}>
        <Icon glyph="person" inverted theme="warning" className={styles.icon} />
        <div className={styles.text}>{online.message}</div>
        <Icon glyph={arrowGlyph} className={styles.arrow} />
      </ActivityListItem>
    );
  }

  renderMembersList() {
    const { members } = this.props;

    return members.map((member) => (
      <ActivityMembersItem member={member} key={member.peerInfo.peer.key} />
    ));
  }

  renderMembers() {
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <ActivityListItem className={styles.members}>
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

export default ActivityMembers;
