/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import IconButton from '../IconButton/IconButton';
import styles from './ActivityProfile.css';

class ActivityGroupProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    peerInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      about: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      bigAvatar: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      presence: PropTypes.string.isRequired,
    }).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.peerInfo !== this.props.peerInfo ||
           nextProps.className !== this.props.className;
  }

  renderAbout() {
    const { peerInfo: { about } } = this.props;

    if (!about) {
      return (
        <div className={styles.about}>No about</div>
      );
    }

    return (
      <div className={styles.about}>{about}</div>
    );
  }

  renderProfileActions() {
    return (
      <div className={styles.actions}>
        <IconButton glyph="phone" size="large" className={styles.button} />
        <IconButton glyph="person_add" size="large" className={styles.button} />
        <IconButton glyph="more" size="large" className={styles.button} />
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
        <div className={styles.creator}>Created by {peerInfo.creator}</div>

        {this.renderAbout()}
        {this.renderProfileActions()}
      </div>
    );
  }
}

export default ActivityGroupProfile;
