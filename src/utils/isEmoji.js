/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

const pattern = /[\uE000-\uF8FF]|\uD83C|\uD83D/g;

function isEmoji(text) {
  return pattern.test(text);
}

export default isEmoji;
