/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import getImageSize from '../../../utils/getImageSize';
import styles from './Video.css';

export type Props = {
  className?: string,
  width: number,
  height: number,
  preview: ?string,
  fileUrl: ?string,
  fileName: ?string,
  maxHeight: number,
  maxWidth: number
};

function Video(props: Props) {
  const style = getImageSize(props.width, props.height, props.maxWidth, props.maxHeight);
  const className = classNames(styles.container, props.className);

  return (
    <div className={className} style={style} title={props.fileName}>
      <video
        controls src={props.fileUrl} width={style.width} height={style.height}
        poster={props.preview}
      />
    </div>
  );
}

export default Video;
