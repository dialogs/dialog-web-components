import React, { Component, PropTypes } from 'react';
import Image from '../Image/Image';

class PhotoMessage extends Component {
  static propTypes = {
    fileUrl: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    preview: PropTypes.string,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired
  };

  render() {
    return (
      <Image
        src={this.props.fileUrl}
        alt={this.props.fileName}
        preview={this.props.preview}
        width={this.props.w}
        height={this.props.h}
      />
    );
  }
}

export default PhotoMessage;
