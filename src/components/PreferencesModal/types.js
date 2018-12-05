/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User, ProfileSettings, AuthSession } from '@dlghq/dialog-types';

export type PreferencesScreen =
  | 'general'
  | 'notifications'
  | 'security'
  | 'shortcuts'
  | 'blocked';

export type Props = {
  className?: string,
  screen: string,
  settings: ProfileSettings,
  sessions: {
    value: ?(AuthSession[]),
    error: ?Error,
    pending: boolean,
  },
  blocked: {
    value: ?(User[]),
    error: ?Error,
    pending: boolean,
  },
  onClose: () => mixed,
  onScreenChange: (screen: string) => mixed,
  onSettingsChange: (value: ProfileSettings) => mixed,
  onSessionsLoad: () => mixed,
  onSessionTerminate: (id: number) => mixed,
  onAllSessionsTerminate: () => mixed,
  onBlockedLoad: () => mixed,
  onUnblockUser: (id: number) => mixed,
};
