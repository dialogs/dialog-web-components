/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, User } from '@dlghq/dialog-types';
import type { Dimension } from './utils/getWindowSize';

export type CallWrapperProps = {
  className?: string,
  id: ?string,
  call: ?Call,
  caller: ?User,
  small: boolean,
  onEnd: (id: string) => any,
  onAnswer: (id: string) => any,
  onMuteToggle: (id: string, isMuted: boolean) => any,
  onCameraToggle: (id: string, isCameraOn: boolean) => any,
  onScreenShareToggle: (id: string, isScreenSharingOn: boolean) => any,
  onResize: (dimension: Dimension) => void,
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
  onMuteToggle: () => void,
  onCameraToggle?: ?() => void,
  onScreenShareToggle?: ?() => void,
  onResize: (dimension: Dimension) => void
};
