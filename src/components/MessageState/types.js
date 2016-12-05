/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo, MessageState } from '@dlghq/dialog-types';

export type MessageStateProps = {
  className?: string,
  state: MessageState,
  time: string,
  readBy?: PeerInfo[]
};

export type MessageReadProps = {
  readBy?: PeerInfo[]
};
