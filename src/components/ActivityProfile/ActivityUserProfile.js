/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import IconButton from '../IconButton/IconButton';
import styles from './ActivityProfile.css';

class ActivityUserProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    peerInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      nick: PropTypes.string.isRequired,
      about: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      bigAvatar: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      presence: PropTypes.array.isRequired,
      phones: PropTypes.array.isRequired,
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.peerInfo !== this.props.peerInfo ||
           nextProps.className !== this.props.className;
  }

  renderAbout() {
    const { peerInfo: { about } } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div className={styles.about}>{about}</div>
    );
  }

  renderProfileActions() {
    return (
      <div className={styles.actions}>
        <IconButton glyph="phone" size="large" className={styles.button} />
        <IconButton glyph="more" size="large" className={styles.button} />
      </div>
    );
  }

  renderProfileContacts() {
    const { peerInfo } = this.props;

    const phones = peerInfo.phones.map((phone, index) => (
      <div key={index}>
        <div className={styles.contactTitle}>{phone.title}</div>
        <div className={styles.contactContent}>{phone.number}</div>
      </div>
    ));

    const emails = peerInfo.emails.map((email, index) => (
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
    const { className, peerInfo } = this.props;
    const userProfileClassName = classNames(styles.root, className);

    return (
      <div className={userProfileClassName}>
        <PeerAvatar
          peer={{
            title: peerInfo.name,
            avatar: peerInfo.avatarBig,
            placeholder: peerInfo.placeholder
          }}
          size="big"
          className={styles.avatar}
        />

        <div className={styles.name}>{peerInfo.name}</div>
        <div className={styles.nick}>@{peerInfo.nick}</div>
        <div className={styles.presence}>{peerInfo.presence}</div>
        {this.renderAbout()}
        {this.renderProfileActions()}
        {this.renderProfileContacts()}
      </div>
    );
  }
}

export default ActivityUserProfile;
