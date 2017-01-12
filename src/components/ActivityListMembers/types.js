/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { GroupMember, UserOnline } from '@dlghq/dialog-types';

export type ChatMember = GroupMember & {
  online: ?UserOnline,
  kickState: {
    pending: boolean,
    error?: string
  }
};
