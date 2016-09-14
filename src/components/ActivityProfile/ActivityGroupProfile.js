/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ActivityProfile.css';

class ActivityGroupProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    peerInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      about: PropTypes.string,
      avatar: PropTypes.string,
      bigAvatar: PropTypes.string,
      placeholder: PropTypes.string.isRequired,
      presence: PropTypes.string.isRequired
    }).isRequired,
    onAboutAdd: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.peerInfo !== this.props.peerInfo ||
           nextProps.className !== this.props.className;
  }

  renderAvatar() {
    const { peerInfo: { name, avatarBig, placeholder } } = this.props;

    return (
      <PeerAvatar
        peer={{
          title: name,
          avatar: avatarBig,
          placeholder
        }}
        size="big"
        className={styles.avatar}
      />
    );
  }

  renderName() {
    const { peerInfo: { name } } = this.props;

    if (!name) {
      return null;
    }

    return (
      <div className={styles.name}>{name}</div>
    );
  }

  renderCreator() {
    const { peerInfo: { creator } } = this.props;

    if (!creator) {
      return null;
    }

    return (
      <div className={styles.creator}>Created by {creator}</div>
    );
  }

  renderAbout() {
    const { peerInfo: { about }, onAboutAdd } = this.props;

    if (!about) {
      return (
        <div className={styles.about}>
          <Button theme="link" onClick={onAboutAdd} className={styles.aboutButton}>
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
    const { className } = this.props;
    const userProfileClassName = classNames(styles.root, className);

    return (
      <div className={userProfileClassName}>
        {this.renderAvatar()}
        {this.renderName()}
        {this.renderCreator()}
        {this.renderAbout()}
        {this.renderProfileActions()}
      </div>
    );
  }
}

export default ActivityGroupProfile;
