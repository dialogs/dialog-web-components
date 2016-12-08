/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivityGroupProfileProps } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import styles from './ActivityProfile.css';

class ActivityGroupProfile extends PureComponent {
  props: ActivityGroupProfileProps;

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

  renderCreator(): ?React.Element<any> {
    const { info: { adminId } } = this.props;

    if (!adminId) {
      return null;
    }

    return (
      <Text
        tagName="div"
        className={styles.creator}
        id="ActivityProfile.created_by"
        values={{ name: String(adminId) }}
      />
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

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

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
