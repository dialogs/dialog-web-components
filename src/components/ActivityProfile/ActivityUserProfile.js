/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import type { User, UserOnline } from '@dlghq/dialog-types';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ActivityProfile.css';

export type ActivityUserProfileProps = {
  info: User,
  online: UserOnline,
  onAboutEdit: () => any,
  className?: string,
  children?: any
}

class ActivityUserProfile extends Component {
  props: ActivityUserProfileProps;

  shouldComponentUpdate(nextProps: ActivityUserProfileProps) {
    return nextProps.info !== this.props.info ||
           nextProps.className !== this.props.className ||
           nextProps.online !== this.props.online ||
           nextProps.children !== this.props.children;
  }

  renderAvatar() {
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

  renderName() {
    const { info: { name } } = this.props;

    if (!name) {
      return null;
    }

    return (
      <div className={styles.name}>{name}</div>
    );
  }

  renderNick() {
    const { info: { nick } } = this.props;

    if (!nick) {
      return null;
    }

    return (
      <div className={styles.nick}>{`@${nick}`}</div>
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
    const { info: { about }, onAboutEdit } = this.props;

    if (!about) {
      return (
        <div className={styles.about}>
          <Button theme="link" onClick={onAboutEdit} className={styles.aboutButton}>
            <Icon glyph="add_circle_outline" className={styles.aboutAddIcon} />
            Add Description
          </Button>
        </div>
      );
    }

    return (
      <div className={styles.about}>{about}</div>
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

  render() {
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
