/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import DownloadButton from './DownloadButton';
import styles from './Document.css';

type Props = {
  className?: string,
  fileUrl: ?string,
  fileName: ?string,
  fileSize: ?string,
  fileExtension: ?string,
  isUploading: boolean
};

class Document extends PureComponent {
  props: Props;

  handleDownload = (): void => {
    console.debug('handleDownload');
  };

  render() {
    const { fileUrl, fileName, fileSize, fileExtension, isUploading } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.uploading]: isUploading
    });

    const tagName = isUploading ? 'a' : 'div';
    const tagProps = isUploading ? {} : { href: fileUrl, download: fileName, rel: 'noopener noreferrer' };

    return (
      <tagName className={className} {...tagProps}>
        <DownloadButton isUploading={isUploading} onClick={this.handleDownload} />
        <div className={styles.info}>
          <div className={styles.filename}>
            <div className={styles.text} title={fileName}>{fileName}</div>
          </div>
          <div className={styles.sizeBlock}>
            <span className={styles.size}>{fileSize}</span>
          </div>
        </div>
      </tagName>
    );
  }
}

export default Document;
