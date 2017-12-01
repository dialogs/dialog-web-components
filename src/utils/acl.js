/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Group, GroupMemberPermission } from '@dlghq/dialog-types';

export function hasPermission(uid: number, group: Group, permission: GroupMemberPermission): boolean {
  // owner always has all permissions
  if (uid === group.adminId) {
    return true;
  }

  const member = group.members.find(({ peerInfo }) => uid === peerInfo.peer.id);
  // user is not a member
  if (!member) {
    return false;
  }

  if (member.permissions.includes(permission)) {
    return true;
  }

  // all members can send messages and invite others
  if (group.type === 'group' && (permission === 'invite' || permission === 'send_message')) {
    return true;
  }

  return false;
}

export function getDefaultPermissions(group: Group): GroupMemberPermission[] {
  switch (group.type) {
    case 'channel':
      return [
        'invite',
        'update_info',
        'send_message',
        'edit_message',
        'delete_message'
      ];

    default:
      return [
        'kick',
        'invite',
        'update_info',
        'send_message',
        'edit_message',
        'delete_message',
        'get_integration_token'
      ];
  }
}
