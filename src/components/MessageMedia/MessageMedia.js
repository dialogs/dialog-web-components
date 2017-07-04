/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMedia as MessageMediaType } from '@dlghq/dialog-types';
import React from 'react';
import MessageMediaWebpage from './MessageMediaWebpage';
import MessageMediaVoice from './MessageMediaVoice';
import MessageMediaImage from './MessageMediaImage';

export type Props = {
  className?: string,
  media: MessageMediaType,
  maxWidth: number,
  maxHeight: number
};

function MessageMedia(props: Props): ?React.Element<any> {
  switch (props.media.type) {
    case 'webpage':
      return <MessageMediaWebpage media={props.media} className={props.className} />;

    case 'voice':
      return (
        <MessageMediaVoice
          media={props.media}
          className={props.className}
          maxWidth={props.maxWidth}
        />
      );

    case 'image':
      return (
        <MessageMediaImage
          media={props.media}
          className={props.className}
          maxWidth={props.maxWidth}
          maxHeight={props.maxHeight}
        />
      );

    default:
      console.warn('Unsupported message media: ', props.media.type); // eslint-disable-line

      return null;
  }
}

export default MessageMedia;
