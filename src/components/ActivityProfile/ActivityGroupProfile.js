/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { PeerInfo } from '../../PropTypes';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ActivityProfile.css';

class ActivityGroupProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    peerInfo: PeerInfo.isRequired,
    children: PropTypes.node,
    onAboutAdd: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.peerInfo !== this.props.peerInfo ||
           nextProps.className !== this.props.className ||
           nextProps.children !== this.props.children ||
           nextProps.onAboutAdd !== this.props.onAboutAdd;
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

  renderChildren() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div className={styles.actions}>{children}</div>
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
        {this.renderChildren()}
      </div>
    );
  }
}

export default ActivityGroupProfile;
