/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React from 'react';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

function ActivityProfile(props: Props): ?React.Element<any> {
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
