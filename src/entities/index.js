/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from './types';
import createSelectorState from './createSelectorState';

const PeerInfoSelectorState = createSelectorState(
  'PeerInfoSelectorState',
  (peerInfo: PeerInfo) => peerInfo.title,
  true
);

export type {
  SelectorState
};

export {
  PeerInfoSelectorState
};
