/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React from 'react';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

function ActivityProfile({ peerInfo, ...props }) {
  switch (peerInfo.type) {
    case 'user':
      return (
        <ActivityUserProfile peerInfo={peerInfo} {...props} />
      );
    case 'group':
      return (
        <ActivityGroupProfile peerInfo={peerInfo} {...props} />
      );
    default:
      console.warn('ActivityProfile does not support this type of peer', peerInfo.type);
      return null;
  }
}

export default ActivityProfile;
