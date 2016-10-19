/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaImage as MessageMediaImageType } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import Image from '../Image/Image';
import styles from './MessageMedia.css';

export type Props = {
  className?: string,
  media: MessageMediaImageType
};

function MessageMediaImage(props: Props): React.Element<any> {
  const className = classNames(styles.container, styles.image, props.className);
  const { media: { content: { url, width, height } } } = props;

  return (
    <Image
      className={className}
      src={url}
      width={width}
      height={height}
      maxWidth="400"
      maxHeight="400"
    />
  );
}

export default MessageMediaImage;
