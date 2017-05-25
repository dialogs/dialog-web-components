/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call, Peer } from '@dlghq/dialog-types';
import type { Size } from './utils/getWindowSize';

export type CallWrapperProps = {
  className?: string,
  call: ?Call,
  small: boolean,
  isVideoEnabled: boolean,
  isScreenSharingEnabled: boolean,
  onEnd: (id: string) => mixed,
  onAnswer: (id: string) => mixed,
  onResize: (size: Size) => mixed,
  onGoToPeer: (peer: Peer) => mixed,
  onMuteToggle: (id: string, isMuted: boolean) => mixed,
  onCameraToggle: (id: string, isCameraOn: boolean) => mixed,
  onScreenShareToggle: (id: string, isScreenSharingOn: boolean) => mixed
};

export type CallProps = {
  className?: string,
  call: Call,
  onEnd: () => mixed,
  onAnswer: () => mixed,
  onResize: (size: Size) => mixed,
  onGoToPeer: (peer: Peer) => mixed,
  onMuteToggle: () => mixed,
  onCameraToggle?: ?() => mixed,
  onScreenShareToggle?: ?() => mixed
};
