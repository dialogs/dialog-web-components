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
  preview: string,
  fileUrl: ?string,
  fileName: ?string,
  onClick?: (event: SyntheticMouseEvent) => any
};

function Photo(props: Props): React.Element<any> {
  const { fileUrl, fileName, preview, width, height } = props;
  const className = classNames(styles.container, props.className);

  return (
    <Image
      className={className}
      src={fileUrl}
      alt={fileName}
      preview={preview}
      width={width}
      height={height}
      onClick={props.onClick}
    />
  );
}

export default Photo;
