/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function calculateCursor({
  min = 0,
  max,
  next,
  looped = false
}: {
  min?: number,
  max: number,
  next: number,
  looped?: boolean
}): number {
  if (next < min) {
    return looped ? max : min;
  }

  if (next > max) {
    return looped ? min : max;
  }

  return next;
}

export default calculateCursor;
