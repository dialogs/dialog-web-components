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

export type MessageContentProps = {
  content: MessageContentTypes
};

function MessageContent({ content }: MessageContentProps) {
  switch (content.type) {
    case 'text':
      return <Text text={content.text} />;

    case 'service':
      return <Text text={content.text} service />;

    case 'photo':
      return <Photo {...content} />;

    case 'document':
      return <Document {...content} />;


    default:
      console.warn('Unsupported message content: ', content);
      return <Text text={`Unsupported message content (${content.type}).`} service />;
  }
}

export default MessageContent;
