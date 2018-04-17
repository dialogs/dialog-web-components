/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, PeerInfo, Field } from '@dlghq/dialog-types';

export type SearchEntity = {
  info: PeerInfo,
  focus: Message,
  before: Message[],
  after: Message[]
};

export type SidebarSearchResultsProps = {
  className?: string,
  query: string,
  peers: PeerInfo[],
  messages: Field<SearchEntity[]>,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: Peer, message: Message) => mixed
};
