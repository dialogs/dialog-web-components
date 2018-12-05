/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo, UserStatusType } from '@dlghq/dialog-types';
import React from 'react';

import Avatar from '../Avatar/Avatar';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';

export type Props = {
  className?: string,
  peer: PeerInfo,
  size: number,
  status?: ?UserStatusType,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

function PeerAvatar(props: Props) {
  return (
    <Avatar
      className={props.className}
      title={props.peer.title}
      image={props.peer.avatar}
      size={props.size}
      placeholder={getAvatarPlaceholder(props.peer.peer.id)}
      onClick={props.onClick}
      status={props.status}
    />
  );
}

export default PeerAvatar;
