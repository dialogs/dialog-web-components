/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field, User } from '@dlghq/dialog-types';
import type { JSONValue } from '@dlghq/dialog-utils';

export type Screen = 'profile' | 'avatar';

export type Profile = {
  name: string,
  nick: ?string,
  about: ?string,
  avatar: ?(string | File),
  customProfile: ?JSONValue
};

export type Props = {
  className?: string,
  profile: ?User,
  context: {
    name: Field<string>,
    nick: Field<?string>,
    about: Field<?string>,
    avatar: Field<?(string | File)>
  },
  schema: ?string,
  onClose: () => void,
  onSubmit: (profile: Profile) => mixed
};

export type State = {
  screen: Screen,
  profile: Profile
};
