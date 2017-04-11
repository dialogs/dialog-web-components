/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo, Peer } from '@dlghq/dialog-types';

export type ReplyAttachment = {
  type: 'reply',
  message: Message
};

export type ForwardAttachment = {
  type: 'forward',
  from: PeerInfo,
  messages: Message[]
};

export type MessageAttachmentType = ReplyAttachment | ForwardAttachment;

export type Props = {
  className?: string,
  attachment: MessageAttachmentType,
  goToPeer: (peer: Peer) => any,
  goToMessage: (message: Message) => any,
};

