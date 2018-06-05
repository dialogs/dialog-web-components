/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

export type ImageSize = {
  width: number,
  height: number
};

function getImageSize(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): ImageSize {
  const ratio = Math.min(maxWidth / width, maxHeight / height);

  return {
    width: width * ratio,
    height: height * ratio
  };
}

export default getImageSize;
