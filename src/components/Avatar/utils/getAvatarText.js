/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import isEmoji from '../../../utils/isEmoji';
import { isEmpty, filter } from 'lodash';

function getAvatarText(title: string): string {
  if (title && title.length) {
    if (isEmoji(title)) {
      return '#';
    }

    const trimmedTitleArray = title.trim().split(' ');
    const titleArray = filter(trimmedTitleArray, (item) => {
      if (isEmoji(item)) {
        return false;
      }

      return !isEmpty(item);
    });

    if (titleArray.length === 1) {
      return titleArray[0][0];
    } else if (titleArray.length > 1) {
      return `${titleArray[0][0]}${titleArray[1][0]}`;
    }
  }

  return '#';
}

export default getAvatarText;
