import React, { Component, PropTypes } from 'react';
import Img from '../../../Img/Img';
import styles from './Photo.css';

class Photo extends Component {
  static propTypes = {
    fileUrl: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    preview: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.fileName !== this.props.fileName ||
           nextProps.preview !== this.props.preview ||
           nextProps.width !== this.props.width ||
           nextProps.height !== this.props.height;
  }

  render() {
    const { fileUrl, fileName, preview, width, height } = this.props;

    return (
      <Img
        className={styles.root}
        src={fileUrl}
        alt={fileName}
        preview={preview}
        width={width}
        height={height}
      />
    );
  }
}

export default Photo;
