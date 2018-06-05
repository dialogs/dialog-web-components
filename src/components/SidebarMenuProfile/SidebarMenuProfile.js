/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder, UserStatusType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import UserStatus from '../UserStatus/UserStatus';
import styles from './SidebarMenuProfile.css';

type Props = {
  className?: string,
  name: string,
  avatar: ?string,
  placeholder: AvatarPlaceholder,
  status: UserStatusType
};

class SidebarMenuProfile extends PureComponent<Props> {
  render() {
    const { name, avatar, placeholder, status } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Avatar
          size={42} title={name} image={avatar} placeholder={placeholder}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <PeerInfoTitle title={name} className={styles.title} emojiSize={16} />
          <UserStatus
            status={status}
            className={styles.status}
            dotClassName={styles.dot}
            statusClassName={styles.status}
          />
        </div>
      </div>
    );
  }
}

export default SidebarMenuProfile;
