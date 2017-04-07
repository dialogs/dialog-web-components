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

export type Field<P> = {
  value: P,
  error: ?Error,
  pending: boolean
};

export type Props = {
  className?: string,
  profile: User,
  context: {
    name: Field<string>,
    nick: Field<?string>,
    about: Field<?string>,
    avatar: Field<?(string | File)>
  },
  onClose: () => void,
  onSubmit: (profile: Profile) => any,
};

export type State = {
  screen: Screen,
  profile: Profile
};
