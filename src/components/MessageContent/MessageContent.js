/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint react/require-optimization: 0 */

import type { MessageContent as MessageContentTypes } from '@dlghq/dialog-types';
import React from 'react';
import Text from './Text/Text';
import Photo from './Photo/Photo';
import Document from './Document/Document';
import Voice from './Voice/Voice';

export type MessageContentProps = {
  content: MessageContentTypes
};

function MessageContent({ content, ...props }: MessageContentProps) {
  switch (content.type) {
    case 'text':
      return <Text text={content.text} {...props} />;

    case 'service':
      return <Text text={content.text} service {...props} />;

    case 'photo':
      return <Photo {...content} {...props} />;

    case 'document':
      return <Document {...content} {...props} />;

    case 'voice':
      return <Voice {...content} {...props} />;

    default:
      console.warn('Unsupported message content: ', content);
      return <Text text={`Unsupported message content (${content.type}).`} service />;
  }
}

export default MessageContent;
