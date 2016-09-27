/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentPhoto } from '@dlghq/dialog-types'
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Image from '../../Image/Image';
import styles from './Photo.css';

class Photo extends Component {
  props: MessageContentPhoto & {
    className?: string
  };

  shouldComponentUpdate(nextProps: MessageContentPhoto) {
    return nextProps.fileUrl !== this.props.fileUrl ||
      nextProps.preview !== this.props.preview ||
      nextProps.fileName !== this.props.fileName ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height;
  }

  render() {
    const { fileUrl, fileName, preview, width, height } = this.props;
    const className = classNames(styles.root, this.props.className);

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
