/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  MessageMedia as MessageMediaType,
  MessageMediaInteractiveConfirm
} from '@dlghq/dialog-types';
import * as React from 'react';
import MessageMediaWebpage from './MessageMediaWebpage';
import MessageMediaVoice from './MessageMediaVoice';
import MessageMediaImage from './MessageMediaImage';
import MessageMediaInteractive from '../MessageMediaInteractive/MessageMediaInteractive';

export type Props = {
  className?: string,
  media: MessageMediaType,
  maxWidth: number,
  maxHeight: number,
  onInteractiveAction?: (id: string, value: string, confirm?: ?MessageMediaInteractiveConfirm) => mixed
};

function MessageMedia(props: Props) {
  switch (props.media.type) {
    case 'webpage':
      return (
        <MessageMediaWebpage
          media={props.media}
          className={props.className}
        />
      );

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

    case 'interactive':
      return (
        <MessageMediaInteractive
          className={props.className}
          media={props.media}
          onSubmit={props.onInteractiveAction}
        />
      );

    default:
      console.warn('Unsupported message media: ', props.media.type); // eslint-disable-line

      return null;
  }
}

export default MessageMedia;
