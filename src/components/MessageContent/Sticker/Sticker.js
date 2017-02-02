/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Image from '../../Image/Image';

export type Props = {
  className?: string,
  fileUrl: ?string,
  fileName: ?string,
  onClick?: (event: SyntheticMouseEvent) => any
};

function Sticker(props: Props): React.Element<any> {
  return (
    <Image
      className={props.className}
      src={props.fileUrl}
      alt={props.fileName}
      width={256}
      height={256}
      onClick={props.onClick}
    />
  );
}

export default Sticker;
