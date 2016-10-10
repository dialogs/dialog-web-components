/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';

export type Props = {
  profile: User,
  className?: string,
  isOpen: boolean,
  onChange: (profile: User) => any,
  onSubmit: (profile: User) => any,
}

export type State = {
  isWantNickname: boolean
}
