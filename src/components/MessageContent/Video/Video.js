/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import getImageSize from '../../../utils/getImageSize';

export type Props = {
  className?: string,
  width: number,
  height: number,
  preview: ?string,
  fileUrl: ?string,
  fileName: ?string
};

function Video(props: Props) {
  const style = getImageSize(props.width, props.height, 400, 400);

  return (
    <div className={props.className} style={style} title={props.fileName}>
      <video
        controls
        src={props.fileUrl}
        width={style.width}
        height={style.height}
        poster={props.preview}
      />
    </div>
  );
}

export default Video;
