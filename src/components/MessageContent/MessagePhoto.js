import React, { Component, PropTypes } from 'react';
import Img from '../Img/Img';
import styles from './MessagePhoto.css';

class MessagePhoto extends Component {
  static propTypes = {
    fileUrl: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    preview: PropTypes.string,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired
  };

  render() {
    const { fileUrl, fileName, preview, w, h } = this.props;

    return (
      <Img
        className={styles.root}
        src={fileUrl}
        alt={fileName}
        preview={preview}
        width={w}
        height={h}
      />
    );
  }
}

export default MessagePhoto;
