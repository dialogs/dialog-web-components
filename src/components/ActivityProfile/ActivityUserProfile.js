/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User, UserOnline } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import Markdown from '../Markdown/Markdown';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityProfile.css';

export type Props = {
  info: User,
  online: UserOnline,
  className?: string,
  children?: mixed
};

class ActivityUserProfile extends PureComponent {
  props: Props;

  renderAvatar() {
    const { info: { name, bigAvatar, placeholder } } = this.props;

    return (
      <Avatar
        className={styles.avatar}
        size="big"
        title={name}
        image={bigAvatar}
        placeholder={placeholder}
      />
    );
  }

  renderTitle() {
    const { info: { name, nick } } = this.props;

    return (
      <PeerInfoTitle
        title={name}
        userName={nick}
        titleClassName={styles.name}
        userNameClassName={styles.nick}
      />
    );
  }

  renderOnline() {
    const { online } = this.props;

    if (!online) {
      return null;
    }

    return (
      <div className={styles.online}>{online.message}</div>
    );
  }

  renderAbout() {
    const { info: { about } } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div className={styles.about}>
        <Markdown text={about} />
      </div>
    );
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div className={styles.actions}>{children}</div>
    );
  }


  renderProfileContacts() {
    const { info } = this.props;

    if (!info.phones.length && !info.emails.length) {
      return null;
    }

    const phones = info.phones.map((phone) => (
      <div key={phone.number}>
        <Text className={styles.contactTitle} tagName="div" id="ActivityProfile.phone" />
        <div className={styles.contactContent}>{phone.number}</div>
      </div>
    ));

    const emails = info.emails.map((email) => (
      <div key={email.email}>
        <Text className={styles.contactTitle} tagName="div" id="ActivityProfile.email" />
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

  render() {
    const { className } = this.props;
    const userProfileClassName = classNames(styles.container, className);

    return (
      <div className={userProfileClassName}>
        {this.renderAvatar()}
        {this.renderTitle()}
        {this.renderOnline()}
        {this.renderAbout()}
        {this.renderChildren()}
        {this.renderProfileContacts()}
      </div>
    );
  }
}

export default ActivityUserProfile;
