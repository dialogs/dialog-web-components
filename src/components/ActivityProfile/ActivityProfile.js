/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React from 'react';
import type { Peer, User, Group, UserOnline, GroupOnline } from '@dlghq/dialog-types';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

// FIXME: add flow
export type ActivityProfileProps = {
  className?: string,
  peer: ?Peer,
  info: ?(User | Group),
  online: ?(UserOnline | GroupOnline),
  onAboutEdit: Function
};

function ActivityProfile({ peer, info, className, onAboutEdit, online }: ActivityProfileProps) {
  if (!peer || !info) {
    return null;
  }

  switch (peer.type) {
    case 'user':
      return (
        <ActivityUserProfile
          info={info}
          onAboutEdit={onAboutEdit}
          className={className}
          online={online}
        />
      );
    case 'group':
      return (
        <ActivityGroupProfile
          info={info}
          onAboutEdit={onAboutEdit}
          className={className}
        />
      );
    default:
      console.warn('ActivityProfile component does not support this type of peer', peer.type);
      return null;
  }
}

export default ActivityProfile;
