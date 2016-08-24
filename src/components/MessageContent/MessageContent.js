/* eslint react/require-optimization:0 */

import React, { PropTypes } from 'react';
import {
  Text,
  Service,
  Photo
} from './Content';

function MessageContent({ content }) {
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
    default:
      return <pre>{JSON.stringify(content)}</pre>;
  }
}

MessageContent.propTypes = {
  content: PropTypes.shape({
    content: PropTypes.oneOf(['text', 'service', 'photo']).isRequired
  }).isRequired
};

export default MessageContent;
