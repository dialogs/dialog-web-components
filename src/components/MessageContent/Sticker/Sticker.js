/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import Image from '../../Image/Image';

export type Props = {
  className?: string,
  emoji: ?string,
  image: ?string,
  width: number,
  height: number,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

function Sticker(props: Props) {
  return (
    <Image
      className={props.className}
      src={props.image}
      alt={props.emoji}
      width={props.width}
      height={props.height}
      maxWidth={128}
      maxHeight={128}
      onClick={props.onClick}
    />
  );
}

export default Sticker;
