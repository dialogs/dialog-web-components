import { PropTypes } from 'react';

const { string, number, bool, shape, oneOf } = PropTypes;

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
