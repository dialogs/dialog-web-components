/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentPhoto } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import Image from '../../Image/Image';
import styles from './Photo.css';

export type Props = MessageContentPhoto & {
  className?: string,
  onClick?: () => any
};

function Photo(props: Props): React.Element<any> {
  const { fileUrl, fileName, preview, width, height } = props;
  const className = classNames(styles.root, props.className);

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
