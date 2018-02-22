/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User, UserOnline } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import Markdown from '../Markdown/Markdown';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import CustomProfile from '../CustomProfile/CustomProfile';
import styles from './ActivityProfile.css';

export type Props = {
  info: User,
  online: UserOnline,
  className?: string,
  schema?: ?string,
  children: Node
};

class ActivityUserProfile extends PureComponent<Props> {
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
        emojiSize={26}
      />
    );
  }

  renderOnline() {
    const { online } = this.props;

    if (!online) {
      return null;
    }

    return <div className={styles.online}>{online.message}</div>;
  }

  renderAbout() {
    const { info: { about } } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        <Text className={styles.title} tagName="div" id="ActivityProfile.about" />
        <Markdown text={about} className={styles.about} />
      </div>
    );
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return <div className={styles.actions}>{children}</div>;
  }

  renderProfileContacts() {
    const { info } = this.props;

    if (!info.phones.length && !info.emails.length) {
      return null;
    }

    const phones = info.phones.map((phone) => (
      <div key={phone.number} className={styles.contactLinkWrapper}>
        <a href={`tel:${phone.number}`} className={styles.contactLink}>
          {phone.number}
        </a>
      </div>
    ));

    const emails = info.emails.map((email) => (
      <div key={email.email} className={styles.contactLinkWrapper}>
        <a href={`mailto:${email.email}`} className={styles.contactLink}>
          {email.email}
        </a>
      </div>
    ));

    return (
      <div className={styles.wrapper}>
        {phones.length ? (
          <div className={styles.contactContent}>
            <Text className={styles.title} tagName="div" id="ActivityProfile.phone" />
            {phones}
          </div>
        ) : null}
        {emails.length ? (
          <div className={styles.contactContent}>
            <Text className={styles.title} tagName="div" id="ActivityProfile.email" />
            {emails}
          </div>
        ) : null}
      </div>
    );
  }

  renderCustomPropfile() {
    const { schema, info: { customProfile } } = this.props;

    if (!schema || !customProfile) {
      return null;
    }

    return <CustomProfile value={customProfile} schema={schema} className={styles.wrapper} />;
  }

  render() {
    const { className } = this.props;
    const userProfileClassName = classNames(styles.container, className);

    return (
      <div className={userProfileClassName}>
        <div className={styles.header}>
          {this.renderAvatar()}
          {this.renderTitle()}
          {this.renderOnline()}
          {this.renderChildren()}
        </div>

        {this.renderAbout()}
        {this.renderProfileContacts()}
        {this.renderCustomPropfile()}
      </div>
    );
  }
}

export default ActivityUserProfile;
