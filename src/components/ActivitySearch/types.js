/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, PeerInfo, Field } from '@dlghq/dialog-types';

export type SearchEntity = {
  info: PeerInfo,
  focus: Message,
  before: Message[],
  after: Message[]
};

export type SearchOptions = {
  ordering: 'recent' | 'relevant'
};

export type ActivitySearchProps = {
  className?: string,
  query: string,
  peers: PeerInfo[],
  messages: Field<SearchEntity[]>,
  options?: SearchOptions,
  onChangeOptions: (options: SearchOptions) => mixed,
  onClose: () => mixed,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: Peer, message: Message) => mixed
};
