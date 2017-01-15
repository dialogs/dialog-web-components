/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import isEmoji from '../../utils/isEmoji';

function getAvatarText(title: string): string {
  if (title && title.length) {
    const titleArray = title.trim().split(' ');
    if (titleArray.length > 1) {
      return `${titleArray[0][0]}${titleArray[1][0]}`;
    }

    const char = title[0];
    if (!isEmoji(char)) {
      return char;
    }
  }

  return '#';
}

export default getAvatarText;
