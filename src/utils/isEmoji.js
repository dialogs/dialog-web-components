/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const pattern = /[\uE000-\uF8FF]|\uD83C|\uD83D/g;

function isEmoji(text: string): boolean {
  return pattern.test(text);
}

export default isEmoji;
