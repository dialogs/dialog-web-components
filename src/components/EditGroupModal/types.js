/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
import type { Group } from '@dlghq/dialog-types';

export type Props = {
  group: Group,
  className?: string,
  name: {
    error: ?Error,
    pending: boolean
  },
  shortname: {
    error: ?Error,
    pending: boolean
  },
  about: {
    error: ?Error,
    pending: boolean
  },
  onClose: () => void,
  onNameChange: (gid: number, name: string) => any,
  onShortnameChange: (gid: number, shortname: string) => any,
  onAboutChange: (gid: number, about: string) => any,
  onAvatarChange: (gid: number, avatar: File) => any,
  onAvatarRemove: (gid: number) => any
};

export type State = {
  name: string,
  about: string,
  shortname: ?string,
}
