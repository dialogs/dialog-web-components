/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type PhotoItem = {
  src: string,
  w: number,
  h: number
};

export type Props = {
  className?: string,
  isOpen: boolean,
  index: number,
  items: PhotoItem[],
  options: Object,
  onClose: () => any,
};
