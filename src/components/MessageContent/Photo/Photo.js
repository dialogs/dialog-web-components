import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Image from '../../Image/Image';
import styles from './Photo.css';

class Photo extends Component {
  static propTypes = {
    fileUrl: PropTypes.string,
    fileName: PropTypes.string,
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
    const className = classNames(styles.root, {
      [styles.portrait]: width < height,
      [styles.landscape]: width > height,
      [styles.square]: width === height
    });

    return (
      <Image
        className={className}
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
