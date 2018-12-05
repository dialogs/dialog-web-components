/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo, GroupMember } from '@dlghq/dialog-types';
import type { SelectorState, SelectorStateCreator } from './types';
import createSelectorState from './createSelectorState';

function peerIntoToQueryString(info: PeerInfo): string {
  if (info.userName) {
    return info.title + ' ' + info.userName;
  }

  return info.title;
}

export const PeerInfoSelectorState: SelectorStateCreator<PeerInfo> = createSelectorState(
  'PeerInfoSelectorState',
  peerIntoToQueryString,
  true,
);

export const MemberSelectorState: SelectorStateCreator<GroupMember> = createSelectorState(
  'MemberSelectorState',
  (member: GroupMember) => peerIntoToQueryString(member.peerInfo),
  true,
);

export type { SelectorState };
