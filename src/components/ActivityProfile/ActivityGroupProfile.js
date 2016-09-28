/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import type { Group } from '@dlghq/dialog-types';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ActivityProfile.css';

export type ActivityGroupProfileProps = {
  info: Group,
  onAboutEdit: () => any,
  className?: string,
  children?: any
}

class ActivityGroupProfile extends Component {
  props: ActivityGroupProfileProps;

  shouldComponentUpdate(nextProps: ActivityGroupProfileProps) {
    return nextProps.info !== this.props.info ||
           nextProps.className !== this.props.className ||
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

  renderCreator() {
    const { info: { adminId } } = this.props;

    if (!adminId) {
      return null;
    }

    return (
      <div className={styles.creator}>Created by {adminId}</div>
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
