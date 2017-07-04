/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export type ImageSize = {
  width: number,
  height: number
};

function getImageSize(width: number,
  height: number,
  maxWidth: number,
  maxHeight: number): ImageSize {
  if (width > height) {
    if (width > maxWidth) {
      return {
        width: maxWidth,
        height: height * (maxWidth / width)
      };
    }
  } else if (height > maxHeight) {
    return {
      width: width * (maxHeight / height),
      height: maxHeight
    };
  }

  return { width, height };
}

export default getImageSize;
