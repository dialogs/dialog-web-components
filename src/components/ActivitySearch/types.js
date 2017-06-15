/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo } from '@dlghq/dialog-types';

export type SearchEntity = {
  info: PeerInfo,
  focus: Message,
  before: Message[],
  after: Message[]
};

export type ActivitySearchProps = {
  className?: string,
  results: SearchEntity[],
  filter?: any,
  onClose: () => any,
  onJumpToMessage: (rid: string) => any
};

export type ActivitySearchListProps = {
  className?: string,
  results: SearchEntity[],
  onJumpToMessage: (rid: string) => any
};

export type ActivitySearchItemProps = {
  className?: string,
  info: PeerInfo,
  focus: Message,
  before: Message[],
  after: Message[],
  onJumpToMessage: (rid: string) => any
};
