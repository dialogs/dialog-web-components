/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import React from 'react';

import AvatarDouble from '../AvatarDouble/AvatarDouble';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';

export type Props = {
  className?: string,
  big: PeerInfo,
  small: PeerInfo,
  size: number,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

function PeerAvatarDouble(props: Props) {
  return (
    <AvatarDouble
      className={props.className}
      big={{
        title: props.big.title,
        image: props.big.avatar,
        placeholder: getAvatarPlaceholder(props.big.peer.id),
      }}
      small={{
        title: props.small.title,
        image: props.small.avatar,
        placeholder: getAvatarPlaceholder(props.small.peer.id),
      }}
      size={props.size}
      onClick={props.onClick}
    />
  );
}

export default PeerAvatarDouble;
