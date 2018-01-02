/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { GroupMember } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './AdminModalUserList.css';
import Avatar from '../../Avatar/Avatar';
import getAvatarPlaceholder from '../../../utils/getAvatarPlaceholder';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';

type Props = {
  user: GroupMember,
  hovered: boolean
};

class AdminModalUserListItem extends PureComponent<Props> {
  renderAvatar() {
    const { user: { peerInfo: { avatar, title, peer: { id } } } } = this.props;
    const placeholder = getAvatarPlaceholder(id);

    return (
      <Avatar
        title={title}
        image={avatar}
        placeholder={placeholder}
        size={36}
        className={styles.avatar}
      />
    );
  }

  render() {
    const { user: { peerInfo: { title } } } = this.props;
    const className = classNames(styles.user, {
      [styles.userHovered]: this.props.hovered
    });

    return (
      <div className={className}>
        <div className={styles.userWrapper}>
          {this.renderAvatar()}
          <span className={styles.title}>
            <PeerInfoTitle title={title} />
          </span>
        </div>
      </div>
    );
  }
}

export default AdminModalUserListItem;
