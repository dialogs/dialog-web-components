/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContent as MessageContentTypes } from '@dlghq/dialog-types';
import React from 'react';
import Text from './Text/Text';
import Photo from './Photo/Photo';
import Document from './Document/Document';
import Voice from './Voice/Voice';
import Location from './Location/Location';
import Contact from './Contact/Contact';

export type Props = {
  content: MessageContentTypes,
  className?: string
};

function MessageContent({ content, ...props }: Props) {
  switch (content.type) {
    case 'text':
      return <Text {...content} {...props} />;

    case 'service':
      return <Text {...content} {...props} service />;

    case 'photo':
      return <Photo {...content} {...props} />;

    case 'document':
      return <Document {...content} {...props} />;

    case 'voice':
      return <Voice {...content} {...props} />;

    case 'location':
      return <Location {...content} {...props} />;

    case 'contact':
      return <Contact {...content} {...props} />;

    default:
      console.warn('Unsupported message content: ', content); // eslint-disable-line
      return <Text text={`Unsupported message content (${content.type}).`} service />;
  }
}

export default MessageContent;
