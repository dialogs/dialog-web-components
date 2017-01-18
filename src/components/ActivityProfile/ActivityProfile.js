/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props as UserProps } from './ActivityUserProfile';
import type { Props as GroupProps } from './ActivityGroupProfile';

import React from 'react';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';

export type Props = (
  ({ type: 'user' } & UserProps) |
  ({ type: 'group' } & GroupProps)
);

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
        >
          {props.children}
        </ActivityGroupProfile>
      );

    default:
      return null;
  }
}

export default ActivityProfile;
