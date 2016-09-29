/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivityProfileProps } from './types';
import React from 'react';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

function ActivityProfile(props: ActivityProfileProps) {
  switch (props.type) {
    case 'user':
      return (
        <ActivityUserProfile
          className={props.className}
          info={props.info}
          online={props.online}
        >
          {props.children}
        </ActivityUserProfile>
      );

    case 'group':
      return (
        <ActivityGroupProfile
          className={props.className}
          info={props.info}
          online={props.online}
          onAboutEdit={props.onAboutEdit}
        >
          {props.children}
        </ActivityGroupProfile>
      );

    default:
      return null;
  }
}

export default ActivityProfile;
