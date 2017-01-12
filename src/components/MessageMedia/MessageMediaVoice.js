/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaAudio } from '@dlghq/dialog-types';
import React from 'react';
import Voice from '../MessageContent/Voice/Voice';
import classNames from 'classnames';
import styles from './MessageMedia.css';

export type Props = {
  className?: string,
  media: MessageMediaAudio
};

function MessageMediaVoice(props: Props): React.Element<any> {
  const className = classNames(styles.container, styles.voice, props.className);
  const { media: { content: { fileUrl, fileSize, mimeType, duration } } } = props;

  return (
    <Voice
      className={className}
      duration={duration}
      fileUrl={fileUrl}
      fileName="MessageMediaVoice"
      fileSize={fileSize}
      fileExtension={mimeType}
    />
  );
}

export default MessageMediaVoice;
