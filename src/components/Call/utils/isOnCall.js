/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallState } from '@dlghq/dialog-types';

function isOnCall(state: CallState): boolean {
  return state === 'in_progress';
}

export default isOnCall;
