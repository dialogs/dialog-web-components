/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentDocument } from '@dlghq/dialog-types';
import React from 'react';
import classNames from 'classnames';
import getExtensionType from '../../../utils/getExtensionType';
import Icon from '../../Icon';
import styles from './Document.css';

function Document(props: MessageContentDocument) {
  const { fileUrl, fileName, fileSize, fileExtension } = props;
  const type = getExtensionType(fileExtension);
  const className = classNames(styles.preview, styles[type]);

  return (
    <a className={styles.root} href={fileUrl} target="_blank" rel="noopener noreferrer">
      <div className={className}>
        {fileExtension}
      </div>
      <div className={styles.info}>
        <div className={styles.filename}>
          <div className={styles.text} title={fileName}>
            {fileName}
          </div>
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
