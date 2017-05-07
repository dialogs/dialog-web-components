/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, User } from '@dlghq/dialog-types';

export type CallWrapperProps = {
  className?: string,
  id: ?string,
  call: ?Call,
  caller: ?User,
  small: boolean,
  onEnd: (id: string) => any,
  onAnswer: (id: string) => any,
  onSizeToggle: (id: string, small: boolean) => any,
  onMuteToggle: (id: string, isMuted: boolean) => any,
  onCameraToggle: (id: string, isCameraOn: boolean) => any,
  onScreenShareToggle: (id: string, isScreenShareOn: boolean) => any,
  isVideoEnabled: boolean,
  isScreenSharingEnabled: boolean
};

export type CallProps = {
  className?: string,
  call: Call,
  caller: User,
  duration: number,
  onEnd: () => void,
  onAnswer: () => void,
  onSizeToggle: () => void,
  onMuteToggle: () => void,
  onCameraToggle: () => void,
  onScreenShareToggle: () => void,
  isVideoEnabled: boolean,
  isScreenSharingEnabled: boolean
};

export type CallInfoProps = {
  call: Call,
  caller: User,
  small: boolean,
  duration: number
};
