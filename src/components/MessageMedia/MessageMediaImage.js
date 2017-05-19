/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaImage as MessageMediaImageType } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import Image from '../Image/Image';
import styles from './MessageMedia.css';

export type Props = {
  className?: string,
  media: MessageMediaImageType,
  maxWidth: number,
  maxHeight: number
};

function MessageMediaImage(props: Props): React.Element<any> {
  const className = classNames(styles.container, styles.image, props.className);
  const { media: { content: { url, width, height } }, maxWidth, maxHeight } = props;

  return (
    <Image
      className={className}
      src={url}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    />
  );
}

export default MessageMediaImage;
