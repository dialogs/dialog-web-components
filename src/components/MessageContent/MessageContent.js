/* eslint react/require-optimization:0 */

import React, { PropTypes } from 'react';
import Text from './Text/Text';
import Photo from './Photo/Photo';
import Service from './Service/Service';
import Document from './Document/Document';

function MessageContent({ content }) {
  switch (content.type) {
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
          width={content.width}
          height={content.height}
        />
      );

    case 'document':
      return (
        <Document
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          fileSize={content.fileSize}
          fileExtension={content.fileExtension}
          isUploading={content.isUploading}
        />
      );
    default:
      console.warn('Unsupported message content', content);

      return (
        <Service text={`Unsupported message content (${content.type}).`} />
      );
  }
}

MessageContent.propTypes = {
  content: PropTypes.shape({
    type: PropTypes.oneOf([
      'text',
      'service',
      'photo',
      'document'
    ]).isRequired
  }).isRequired
};

export default MessageContent;
