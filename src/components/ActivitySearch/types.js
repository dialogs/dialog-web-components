/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo } from '@dlghq/dialog-types';

export type SearchEntity = {
  info: PeerInfo,
  messages: Message[],
  focus: number,
  highlight: Array<[number, number]>
};

export type ActivitySearchProps = {
  className?: string,
  results: SearchEntity[],
  filter?: any,
  onClose: () => any,
  onJumpToMessage: () => any
};

export type ActivitySearchListProps = {
  className?: string,
  results: SearchEntity[],
  onJumpToMessage: () => any
};

export type ActivitySearchItemProps = SearchEntity & {
  className?: string,
  onJumpToMessage: () => any
};
