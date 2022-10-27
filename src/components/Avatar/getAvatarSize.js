/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const SIZES = {
  tiny: 14,
  small: 22,
  medium: 28,
  large: 36,
  big: 100,
  super: 150
};

export type AvatarSize = $Enum<typeof SIZES> | number;

function getAvatarSize(size: AvatarSize): number {
  if (typeof size === 'number') {
    return size;
  }

  return SIZES[size];
}

export default getAvatarSize;
