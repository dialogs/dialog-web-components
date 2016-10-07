/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type Preferences = {
  sendByEnter: boolean,
  isSoundEnabled: boolean,
};

export type Props = {
  preferences: Preferences,
  screen: 'general' | 'notifications' | 'security' | 'shortcuts' | 'blocked',
  className?: string,
  isOpen: boolean,
  onScreenChange: Function,
  onChange: Function,
  onSubmit: Function
}
