/* eslint react/require-optimization:0 */

import React, { PropTypes } from 'react';
import {
  Text,
  Service,
  Photo,
  Document
} from './Content';

const CONTENT_TYPES = [
  'text',
  'service',
  'photo',
  'document'
];

function MessageContent({ content }) {
  // TODO: use constants for content types;
  switch (content.content) {
    case 'text':
      return <Text text={content.text} />;
    case 'service':
      return <Service text={content.text} />;
    case 'photo':
      return (
        <Photo
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          preview={content.preview}
          width={content.w}
          height={content.h}
        />
      );
    case 'document':
      return (
        <Document
          fileExtension={content.fileExtension}
          fileName={content.fileName}
          fileSize={content.fileSize}
          fileUrl={content.fileUrl}
          isUploading={content.isUploading}
        />
      );
    default:
      return <pre>{JSON.stringify(content)}</pre>;
  }
}

MessageContent.propTypes = {
  content: PropTypes.shape({
    content: PropTypes.oneOf(CONTENT_TYPES).isRequired
  }).isRequired
};

export default MessageContent;
