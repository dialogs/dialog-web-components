/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type AutoSizerState = {
  width: number,
  height: number
};

export type ListRowProps = {
  index: number,
  key: string,
  style: { [key: string]: string },
  isScrolling: boolean
};
