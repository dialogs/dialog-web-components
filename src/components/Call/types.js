/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, CallState, PeerInfo } from '@dlghq/dialog-types';

export type EndHandler = () => any;
export type SizeToggleHandler = (small: boolean) => any;
export type MuteToggleHandler = (isMuted: boolean) => any;

export type CallWrapperProps = {
  className?: string,
  call?: Call,
  small: boolean,
  duration: number,
  onEnd: EndHandler,
  onSizeToggle: SizeToggleHandler,
  onMuteToggle: MuteToggleHandler
};

export type CallProps = {
  className?: string,
  call: Call,
  caller: PeerInfo,
  duration: number,
  onEnd: EndHandler,
  onSizeToggle: SizeToggleHandler,
  onMuteToggle: MuteToggleHandler
};

export type CallAvatarProps = {
  state: CallState,
  caller: PeerInfo
};

export type CallInfoProps = {
  call: Call,
  caller: PeerInfo,
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
  onEnd: EndHandler,
  onSizeToggle: SizeToggleHandler,
  onMuteToggle: MuteToggleHandler
};
