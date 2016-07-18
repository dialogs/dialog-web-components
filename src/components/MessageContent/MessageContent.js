/* eslint react/require-optimization:0 */

import React, { PropTypes } from 'react';
import MessageText from './MessageText';
import MessageService from './MessageService';
import MessagePhoto from './MessagePhoto';

function MessageContent({ content }) {
  switch (content.content) {
    case 'text':
      return <MessageText text={content.text} />;
    case 'service':
      return <MessageService text={content.text} />;
    case 'photo':
      return (
        <MessagePhoto
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          preview={content.preview}
          w={content.w}
          h={content.h}
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
