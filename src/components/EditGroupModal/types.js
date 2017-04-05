/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Group } from '@dlghq/dialog-types';

type GroupUpdate = {
  name: string,
  about: ?string,
  shortname: ?string,
  avatar: ?(string | File)
}

export type Props = {
  group: Group,
  className?: string,
  shortnamePrefix?: ?string,
  onClose: () => void,
  onSubmit: (gid: number, group: GroupUpdate) => any
};

export type State = {
  screen: 'info' | 'avatar',
  group: GroupUpdate
}
