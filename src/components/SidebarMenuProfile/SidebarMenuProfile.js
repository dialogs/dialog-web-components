/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import Presence, { type PresenceType } from '../Presence/Presence';
import styles from './SidebarMenuProfile.css';

type Props = {
  className?: string,
  name: string,
  avatar: string,
  placeholder: string,
  status: PresenceType
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
          <PeerInfoTitle title={name} className={styles.title} />
          <Presence
            status={status}
            className={styles.presence}
            dotClassName={styles.dot}
            statusClassName={styles.status}
          />
        </div>
      </div>
    );
  }
}

export default SidebarMenuProfile;
