/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AttachmentPreviewProps } from './types';
import React from 'react';
import classNames from 'classnames';
import getDocumentType from '../../utils/getDocumentType';
import getFilenameExtension from '../../utils/getFilenameExtension';
import styles from './AttachmentModal.css';

function AttachmentPreview({ file }: AttachmentPreviewProps) {
  if (file.type.indexOf('image/') === 0) {
    return (
      <div className={styles.preview}>
        <img
          src={URL.createObjectURL(file)}
          className={styles.previewImage}
        />
      </div>
    );
  }

  const type = getDocumentType(file.type);
  const className = classNames(styles.previewDocument, styles[type]);
  const extension = typeof file.name === 'string' ? getFilenameExtension(file.name) : '?';

  return (
    <div className={styles.preview}>
      <div className={className}>{extension}</div>
    </div>
  );
}

export default AttachmentPreview;
