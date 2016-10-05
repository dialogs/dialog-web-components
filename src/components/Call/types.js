/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, CallState, User } from '@dlghq/dialog-types';

export type EndHandler = () => any;
export type SizeToggleHandler = (small: boolean) => any;
export type MuteToggleHandler = (isMuted: boolean) => any;

export type CallWrapperProps = {
  className?: string,
  call: ?Call,
  caller: ?User,
  small: boolean,
  duration: number,
  onEnd: EndHandler,
  onSizeToggle: SizeToggleHandler,
  onMuteToggle: MuteToggleHandler
};

export type CallProps = {
  className?: string,
  call: Call,
  caller: User,
  duration: number,
  onEnd: EndHandler,
  onSizeToggle: SizeToggleHandler,
  onMuteToggle: MuteToggleHandler
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
  isOutgoing: boolean,
  duration: number
};

export type CallControlsProps = {
  small: boolean,
  isMuted: boolean,
  isOutgoing: boolean,
  onEnd: EndHandler,
  onSizeToggle: SizeToggleHandler,
  onMuteToggle: MuteToggleHandler
};
