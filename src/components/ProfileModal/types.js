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
  avatar: ?(string | File)
};

type ProfileContext = {
  name: {
    pending: boolean,
    error: ?Error
  },
  nick: {
    pending: boolean,
    error: ?Error
  },
  about: {
    pending: boolean,
    error: ?Error
  },
  avatar: {
    pending: boolean,
    error: ?Error
  },
};

export type Props = {
  className?: string,
  profile: User,
  context: ProfileContext,
  onClose: () => void,
  onSubmit: (profile: Profile) => any,
};

export type State = {
  screen: Screen,
  profile: Profile
};
