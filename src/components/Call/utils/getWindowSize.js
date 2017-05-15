/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call } from '@dlghq/dialog-types';
import { hasTheirVideos } from './hasVideo';
import isOnCall from './isOnCall';

type Dimension = {
  width: number,
  height: number
};

function getWindowSize(call: Call): Dimension {
  if (!isOnCall(call.state)) {
    return {
      width: 340,
      height: 360
    };
  }

  if (hasTheirVideos(call)) {
    return {
      width: 355,
      height: 200
    };
  }

  return {
    width: 300,
    height: 138
  };
}

export default getWindowSize;
