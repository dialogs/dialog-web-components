/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  Peer,
  PeerInfo,
  Message,
  MessageState
} from '@dlghq/dialog-types';

export type MessageProps = {
  peer: Peer,
  message: Message,
  state: MessageState
};

export type MessageStateProps = {
  state: MessageState,
  readBy?: PeerInfo[]
};
