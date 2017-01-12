/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { AvatarSize } from '../Avatar/Avatar';

import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './PeerAvatar.css';

export type Props = {
  className?: string,
  peer: PeerInfo,
  size?: AvatarSize,
  online?: boolean,
  onClick?: (event: SyntheticMouseEvent) => any
};

function PeerAvatar(props: Props) {
  const avatar = (
    <Avatar
      className={props.className}
      size={props.size}
      image={props.peer.avatar}
      title={props.peer.title}
      placeholder={props.peer.placeholder}
      onClick={props.onClick}
    />
  );

  if (props.online) {
    return (
      <div className={styles.container}>
        {avatar}
        <div className={styles.online} />
      </div>
    );
  }

  return avatar;
}

export default PeerAvatar;
