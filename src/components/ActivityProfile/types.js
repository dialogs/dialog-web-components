/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  User,
  Group,
  UserOnline,
  GroupOnline
} from '@dlghq/dialog-types';

export type ActivityUserProfileProps = {
  info: User,
  online: UserOnline,
  className?: string,
  children?: any
};

export type ActivityGroupProfileProps = {
  info: Group,
  online: GroupOnline,
  onAboutEdit: () => any,
  className?: string,
  children?: any
};

export type Props = (
  ({ type: 'user' } & ActivityUserProfileProps) |
  ({ type: 'group' } & ActivityGroupProfileProps)
);
