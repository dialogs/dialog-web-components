/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Group } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import Markdown from '../Markdown/Markdown';
import styles from './ActivityProfile.css';

export type Props = {
  className?: string,
  info: Group,
  children?: mixed
};

class ActivityGroupProfile extends PureComponent {
  props: Props;

  renderAvatar(): React.Element<any> {
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
    const { info: { type, adminId, members } } = this.props;

    if (type !== 'group') {
      return null;
    }

    const admin = members.find((member) => {
      return member.peerInfo.peer.id === adminId;
    });

    if (!admin) {
      return null;
    }

    return (
      <Text
        tagName="div"
        className={styles.creator}
        id="ActivityProfile.created_by"
        values={{ name: admin.peerInfo.title }}
      />
    );
  }

  renderAbout(): ?React.Element<any> {
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
        {this.renderCreator()}
        {this.renderChildren()}
      </div>
    );
  }
}

export default ActivityGroupProfile;
