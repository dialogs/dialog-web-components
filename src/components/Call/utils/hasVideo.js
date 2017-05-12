/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call } from '@dlghq/dialog-types';

function hasTheirVideos(call: Call): boolean {
  return Boolean(call.theirVideos.length);
}

function hasOwnVideos(call: Call): boolean {
  return Boolean(call.ownVideos.length);
}

function hasVideos(call: Call): boolean {
  return Boolean(hasOwnVideos(call) || hasTheirVideos(call));
}

export {
  hasVideos,
  hasOwnVideos,
  hasTheirVideos
};
