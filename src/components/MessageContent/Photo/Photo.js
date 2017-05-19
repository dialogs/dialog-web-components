/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import Image from '../../Image/Image';
import styles from './Photo.css';

export type Props = {
  className?: string,
  width: number,
  height: number,
  maxHeight: number,
  maxWidth: number,
  rid: string,
  preview: ?string,
  fileUrl: ?string,
  fileName: ?string,
  onClick?: (event: SyntheticMouseEvent) => any
};

function Photo(props: Props): React.Element<any> {
  const { fileUrl, fileName, preview, width, height, rid, maxWidth, maxHeight } = props;
  const className = classNames(styles.container, props.className);

  return (
    <Image
      id={`photo_${rid}`}
      className={className}
      src={fileUrl}
      alt={fileName}
      preview={preview}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onClick={props.onClick}
    />
  );
}

export default Photo;
