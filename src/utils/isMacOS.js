/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const pattern = /^Mac/;

function isMacOS(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return pattern.test(navigator.platform);
}

export default isMacOS;
