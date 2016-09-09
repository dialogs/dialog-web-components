/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

function ActivityProfile({ peerInfo }) {
  switch (peerInfo.type) {
    case 'user':
      return (
        <ActivityUserProfile peerInfo={peerInfo} />
      );
    case 'group':
      return (
        <ActivityGroupProfile peerInfo={peerInfo} />
      );
    default:
      console.warn('ActivityProfile does not support this type of peer', peerInfo.type);
      return null;
  }
}

export default ActivityProfile;
