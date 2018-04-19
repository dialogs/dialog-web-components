/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

const pattern = /^[\uD83C-\uDBFF\uDC00-\uDFFF]+$/;

function isEmoji(text: string): boolean {
  return pattern.test(text);
}

export default isEmoji;
