/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Group } from '@dlghq/dialog-types';

export type Props = {
  group: Group,
  className?: string,
  name: {
    error: ?string,
    pending: boolean
  },
  shortname: {
    error: ?string,
    pending: boolean
  },
  about: {
    error: ?string,
    pending: boolean
  },
  shortnamePrefix?: ?string,
  onClose: () => void,
  onNameChange: (gid: number, name: string) => any,
  onShortnameChange: (gid: number, shortname: string) => any,
  onAboutChange: (gid: number, about: string) => any,
  onAvatarChange: (gid: number, avatar: File) => any,
  onAvatarRemove: (gid: number) => any
};

export type State = {
  name: string,
  about: ?string,
  shortname: ?string
}
