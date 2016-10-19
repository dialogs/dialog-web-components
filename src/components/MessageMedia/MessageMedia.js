/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMedia as MessageMediaType } from '@dlghq/dialog-types';
import React from 'react';
import MessageMediaWebpage from './MessageMediaWebpage';
import MessageMediaVoice from './MessageMediaVoice';
import MessageMediaImage from './MessageMediaImage';

export type Props = {
  className?: string,
  media: MessageMediaType
};

function MessageMedia(props: Props): ?React.Element<any> {
  switch (props.media.type) {
    case 'webpage':
      return <MessageMediaWebpage media={props.media} className={props.className} />;

    case 'voice':
      return <MessageMediaVoice media={props.media} className={props.className} />;

    case 'image':
      return <MessageMediaImage media={props.media} className={props.className} />;

    default:
      console.warn('Unsupported message media: ', props.media.type);
      return null;
  }
}

export default MessageMedia;
