/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivityGroupProfileProps } from './types';
import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ActivityProfile.css';

class ActivityGroupProfile extends Component {
  props: ActivityGroupProfileProps;

  shouldComponentUpdate(nextProps: ActivityGroupProfileProps) {
    return nextProps.info !== this.props.info ||
           nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
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
      <Text
        tagName="div"
        className={styles.creator}
        id="ActivityProfile.created_by"
        values={{ name: adminId }}
      />
    );
  }

  renderAbout() {
    const { info: { about }, onAboutEdit } = this.props;

    if (about) {
      return (
        <div className={styles.about}>{about}</div>
      );
    }

    return (
      <div className={styles.about}>
        <Button theme="link" onClick={onAboutEdit} className={styles.aboutButton}>
          <Icon glyph="add_circle_outline" className={styles.aboutAddIcon} />
          <Text id="ActivityProfile.add_description" />
        </Button>
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

  render() {
    const className = classNames(styles.root, this.props.className);

    return (
      <div className={className}>
        {this.renderAvatar()}
        {this.renderName()}
        {this.renderAbout()}
        {this.renderChildren()}
      </div>
    );
  }
}

export default ActivityGroupProfile;
