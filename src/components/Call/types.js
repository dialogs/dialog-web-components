/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, CallState, User } from '@dlghq/dialog-types';

export type CallWrapperProps = {
  className?: string,
  id: ?string,
  call: ?Call,
  caller: ?User,
  small: boolean,
  onEnd: (id: string) => any,
  onAnswer: (id: string) => any,
  onSizeToggle: (id: string, small: boolean) => any,
  onMuteToggle: (id: string, isMuted: boolean) => any
};

export type CallProps = {
  className?: string,
  call: Call,
  caller: User,
  duration: number,
  onEnd: () => void,
  onAnswer: () => void,
  onSizeToggle: () => void,
  onMuteToggle: () => void
};

export type CallAvatarProps = {
  state: CallState,
  caller: User
};

export type CallInfoProps = {
  call: Call,
  caller: User,
  small: boolean,
  duration: number
};

export type CallInfoStateProps = {
  state: CallState,
  duration: number,
  isOutgoing: boolean
};

export type CallControlsProps = {
  state: CallState,
  small: boolean,
  isMuted: boolean,
  isOutgoing: boolean,
  onEnd: () => void,
  onAnswer: () => void,
  onSizeToggle: () => void,
  onMuteToggle: () => void
};
