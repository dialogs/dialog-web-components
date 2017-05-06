/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import { TITLE_HEIGHT } from './calculator';

export function scrollToCategory<T>(
  items: T[],
  nextId: string,
  getId: (item: T) => string,
  getHeight: (item: T) => number
): number {
  let scrollTo = 0;
  for (const item of items) {
    if (nextId === getId(item)) {
      return scrollTo;
    }

    scrollTo += getHeight(item) + TITLE_HEIGHT;
  }

  return -1;
}

export function handleScroll<T>(
  scrollTop: number,
  items: T[],
  getId: (item: T) => string,
  getHeight: (item: T) => number
) {
  let fullHeight = 0;
  for (const item of items) {
    const offset = fullHeight + getHeight(item);
    fullHeight = offset + TITLE_HEIGHT;
    if (fullHeight > scrollTop) {
      return {
        current: getId(item),
        isAtBottom: offset <= scrollTop
      };
    }
  }

  return null;
}
