/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';

export type Screen = 'profile' | 'avatar';

export type Profile = {
  name: string,
  nick: ?string,
  about: ?string,
  avatar: ?string,
  avatarFile: ?File
};

export type Props = {
  className?: string,
  profile: User,
  context: {
    name: {
      error: ?Error,
      pending: boolean
    },
    nick: {
      error: ?Error,
      pending: boolean
    },
    about: {
      error: ?Error,
      pending: boolean
    }
  },
  onClose: () => void,
  onSubmit: (profile: Profile) => any,
};

export type State = {
  screen: Screen,
  profile: Profile
};
