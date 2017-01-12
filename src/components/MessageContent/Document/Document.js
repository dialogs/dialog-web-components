/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentDocument } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import getExtensionType from '../../../utils/getExtensionType';
import Icon from '../../Icon/Icon';
import Spinner from '../../Spinner/Spinner';
import styles from './Document.css';

function Document(props: MessageContentDocument) {
  const { fileUrl, fileName, fileSize, fileExtension, isUploading } = props;
  const type = fileExtension ? getExtensionType(fileExtension) : 'unknown';
  const className = classNames(styles.container, {
    [styles.uploading]: isUploading
  });
  const previewClassName = classNames(styles.preview, styles[type]);

  if (isUploading) {
    return (
      <div className={className}>
        <div className={previewClassName}>{fileExtension}</div>
        <div className={styles.info}>
          <div className={styles.filename}>
            <div className={styles.text} title={fileName}>{fileName}</div>
          </div>
          <div className={styles.sizeBlock}>
            <span className={styles.size}>{fileSize}</span>
          </div>
        </div>
        <Spinner className={styles.spinner} />
      </div>
    );
  }

  return (
    <a className={className} href={fileUrl} download={fileName} rel="noopener noreferrer">
      <div className={previewClassName}>{fileExtension}</div>
      <div className={styles.info}>
        <div className={styles.filename}>
          <div className={styles.text} title={fileName}>{fileName}</div>
        </div>
        <div className={styles.sizeBlock}>
          <Icon glyph="arrow_downward" className={styles.downloadArrow} />
          <span className={styles.size}>{fileSize}</span>
        </div>
      </div>
    </a>
  );
}

export default Document;
