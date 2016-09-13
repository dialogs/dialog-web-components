/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

function isSamePeer(peer1, peer2) {
  return Boolean(
    peer1 && peer2 &&
    peer1.id === peer2.id &&
    peer1.type === peer2.type
  );
}

export default isSamePeer;
