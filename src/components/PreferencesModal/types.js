/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { User, ProfileSettings, AuthSession } from '@dlghq/dialog-types';

export type PreferencesScreen = 'general' | 'notifications' | 'security' | 'shortcuts' | 'blocked';

export type Props = {
  className?: string,
  screen: PreferencesScreen,
  settings: {
    value: ?ProfileSettings,
    error: ?Error,
    pending: boolean
  },
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
  onScreenChange: (screen: PreferencesScreen) => any,
  onSettingsLoad: () => any,
  onSettingsChange: (value: ProfileSettings) => any,
  onSettingsSave: (value: ProfileSettings) => any,
  onSessionsLoad: () => any,
  onSessionTerminate: (id: number) => any,
  onAllSessionsTerminate: () => any,
  onBlockedLoad: () => any
}
