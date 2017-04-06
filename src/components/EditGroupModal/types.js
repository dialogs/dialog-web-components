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

type GroupContext = {
  name: {
    pending: boolean,
    error: ?Error
  },
  about: {
    pending: boolean,
    error: ?Error
  },
  shortname: {
    pending: boolean,
    error: ?Error
  },
  avatar: {
    pending: boolean,
    error: ?Error
  }
};

export type Props = {
  group: Group,
  context: GroupContext,
  className?: string,
  shortnamePrefix?: ?string,
  onClose: () => void,
  onSubmit: (gid: number, group: GroupUpdate) => any
};

export type State = {
  screen: 'info' | 'avatar',
  group: GroupUpdate
}
