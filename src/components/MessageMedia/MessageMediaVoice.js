/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaAudio } from '@dlghq/dialog-types';
import React from 'react';
import Voice from '../MessageContent/Voice/Voice';
import classNames from 'classnames';
import styles from './MessageMedia.css';

export type Props = {
  className?: string,
  media: MessageMediaAudio,
  maxWidth: number
};

function MessageMediaVoice(props: Props): React.Element<any> {
  const className = classNames(styles.container, styles.voice, props.className);
  const { media: { content: { fileUrl, duration } }, maxWidth } = props;

  return (
    <Voice
      isUploading={false}
      className={className}
      duration={duration}
      fileUrl={fileUrl}
      maxWidth={maxWidth}
    />
  );
}

export default MessageMediaVoice;
