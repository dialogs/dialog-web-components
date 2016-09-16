/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React from 'react';
import { Peer } from '../../PropTypes';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

function ActivityProfile({ peer, ...props }) {
  switch (peer.type) {
    case 'user':
      return (
        <ActivityUserProfile {...props} />
      );
    case 'group':
      return (
        <ActivityGroupProfile {...props} />
      );
    default:
      console.warn('ActivityProfile component does not support this type of peer', peer.type);
      return null;
  }
}

ActivityProfile.propTypes = {
  peer: Peer.isRequired
};

export default ActivityProfile;
