/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';

export type ProfileContext = {
  error: ?Error,
  pending: boolean
};

export type Props = {
  className?: string,
  profile: User,
  context: {
    name: ProfileContext,
    nick: ProfileContext,
    about: ProfileContext
  },
  onClose: () => void,
  onNameChange: (name: string) => any,
  onNickChange: (nick: string) => any,
  onAboutChange: (about: string) => any,
  onAvatarChange: (avatar: File) => any,
  onAvatarRemove: () => any
};

export type State = {
  name: string,
  nick: ?string,
  about: ?string,
  avatar: ?string,
  isWantNickname: boolean
};
