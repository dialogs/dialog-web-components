/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Image from '../../Image/Image';

export type Props = {
  className?: string,
  emoji: ?string,
  image: ?string,
  width: number,
  height: number,
  onClick?: (event: SyntheticMouseEvent) => any
};

function Sticker(props: Props): React.Element<any> {
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
