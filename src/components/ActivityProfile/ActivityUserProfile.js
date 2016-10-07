/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivityUserProfileProps } from './types';
import React, { Component } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './ActivityProfile.css';

class ActivityUserProfile extends Component {
  props: ActivityUserProfileProps;

  shouldComponentUpdate(nextProps: ActivityUserProfileProps): boolean {
    return nextProps.info !== this.props.info ||
           nextProps.online !== this.props.online ||
           nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  renderAvatar(): React.Element<any> {
    const { info: { name, bigAvatar, placeholder } } = this.props;

    return (
      <PeerAvatar
        peer={{
          title: name,
          avatar: bigAvatar,
          placeholder
        }}
        size="big"
        className={styles.avatar}
      />
    );
  }

  renderName(): ?React.Element<any> {
    const { info: { name } } = this.props;

    if (!name) {
      return null;
    }

    return (
      <div className={styles.name}>{name}</div>
    );
  }

  renderNick(): ?React.Element<any> {
    const { info: { nick } } = this.props;

    if (!nick) {
      return null;
    }

    return (
      <div className={styles.nick}>{`@${nick}`}</div>
    );
  }

  renderOnline(): ?React.Element<any> {
    const { online } = this.props;

    if (!online) {
      return null;
    }

    return (
      <div className={styles.online}>{online.message}</div>
    );
  }

  renderAbout(): ?React.Element<any> {
    const { info: { about } } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div className={styles.about}>{about}</div>
    );
  }

  renderChildren(): ?React.Element<any> {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div className={styles.actions}>{children}</div>
    );
  }


  renderProfileContacts(): React.Element<any> {
    const { info } = this.props;

    if (!info.phones.length && !info.emails.length) {
      return null;
    }

    const phones = info.phones.map((phone, index) => (
      <div key={index}>
        <div className={styles.contactTitle}>{phone.title}</div>
        <div className={styles.contactContent}>{phone.number}</div>
      </div>
    ));

    const emails = info.emails.map((email, index) => (
      <div key={index}>
        <div className={styles.contactTitle}>{email.title}</div>
        <div className={styles.contactContent}>{email.email}</div>
      </div>
    ));

    return (
      <div className={styles.contacts}>
        {phones}
        {emails}
      </div>
    );
  }

  render(): React.Element<any> {
    const { className } = this.props;
    const userProfileClassName = classNames(styles.root, className);

    return (
      <div className={userProfileClassName}>
        {this.renderAvatar()}
        {this.renderName()}
        {this.renderNick()}
        {this.renderOnline()}
        {this.renderAbout()}
        {this.renderChildren()}
        {this.renderProfileContacts()}
      </div>
    );
  }
}

export default ActivityUserProfile;
