/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User, ProfileSettings, AuthSession } from '@dlghq/dialog-types';

export type PreferencesScreen = 'general' | 'notifications' | 'security' | 'shortcuts' | 'blocked';

export type Props = {
  className?: string,
  screen: string,
  settings: ProfileSettings,
  sessions: {
    value: ?AuthSession[],
    error: ?Error,
    pending: boolean
  },
  blocked: {
    value: ?User[],
    error: ?Error,
    pending: boolean
  },
  onClose: close,
  onScreenChange: (screen: string) => any,
  onSettingsChange: (value: ProfileSettings) => any,
  onSessionsLoad: () => any,
  onSessionTerminate: (id: number) => any,
  onAllSessionsTerminate: () => any,
  onBlockedLoad: () => any,
  onUnblockUser: (id: number) => any
};
