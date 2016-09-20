import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Image from '../../Image/Image';
import styles from './Photo.css';

class Photo extends Component {
  static propTypes = {
    className: PropTypes.string,
    fileUrl: PropTypes.string,
    fileName: PropTypes.string,
    preview: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.fileUrl !== this.props.fileUrl ||
      nextProps.preview !== this.props.preview ||
      nextProps.fileName !== this.props.fileName ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height;
  }

  render() {
    const className = classNames(styles.root, this.props.className);

    return (
      <Image
        className={className}
        src={this.props.fileUrl}
        alt={this.props.fileName}
        preview={this.props.preview}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Photo;
