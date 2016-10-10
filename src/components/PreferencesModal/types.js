/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type Preferences = {
  sendByEnter: boolean,
  isSoundEnabled: boolean,
  privateNotifications: boolean,
  privateMessagePreview: boolean,
  groupNotifications: boolean,
  groupMessagePreview: boolean,
  groupOnlyMentions: boolean
};

export type PreferencesScreen = 'general' | 'notifications' | 'security' | 'shortcuts' | 'blocked';

export type Props = {
  className?: string,
  screen: Screen,
  preferences: Preferences,
  onScreenChange: (screen: PreferencesScreen) => any,
  onChange: Function,
  onSubmit: Function
}
