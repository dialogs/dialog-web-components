import { PropTypes } from 'react';

const { string, number, bool, shape, oneOf, arrayOf } = PropTypes;

export const Peer = shape({
  id: number.isRequired,
  type: oneOf(['user', 'group']).isRequired
});

export const PeerInfo = shape({
  peer: Peer.isRequired,
  title: string,
  userName: string,
  avatar: string,
  placeholder: string,
  isVerified: bool
});

export const Phone = shape({
  title: string.isRequired,
  number: string.isRequired
});

export const Email = shape({
  title: string.isRequired,
  email: string.isRequired
});

export const User = shape({
  id: number.isRequired,
  name: string.isRequired,
  nick: string,
  about: string,
  timeZone: string.isRequired,
  phones: arrayOf(Phone).isRequired,
  emails: arrayOf(Email).isRequired,
  avatar: string,
  bigAvatar: string,
  placeholder: string.isRequired,
  isContact: bool,
  isBot: bool,
  isOnline: bool,
  isBlocked: bool,
  isVerified: bool
});

export const GroupMember = shape({
  peerInfo: PeerInfo.isRequired,
  isAdmin: bool.isRequired,
  canKick: bool.isRequired
});

export const Group = shape({
  id: number.isRequired,
  name: string.isRequired,
  about: string,
  avatar: string,
  bigAvatar: string,
  placeholder: string.isRequired,
  adminId: number.isRequired,
  members: arrayOf(GroupMember).isRequired
});
