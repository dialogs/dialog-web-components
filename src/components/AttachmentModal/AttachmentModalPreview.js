/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React from 'react';
import classNames from 'classnames';
import getDocumentType from '../../utils/getDocumentType';
import getFilenameExtension from '../../utils/getFilenameExtension';
import styles from './AttachmentModal.css';

export type AttachmentModalPreviewProps = {
  attachment: File
};

function AttachmentModalPreview(props: AttachmentModalPreviewProps) {
  const { attachment } = props;

  if (attachment.type.indexOf('image/') === 0) {
    return (
      <div className={styles.preview}>
        <img
          src={URL.createObjectURL(attachment)}
          className={styles.previewImage}
        />
      </div>
    );
  }

  const extension = getFilenameExtension(attachment.name);
  const type = getDocumentType(extension);
  const className = classNames(styles.previewDocument, styles[type]);

  return (
    <div className={className}>{extension}</div>
  );
}

export default AttachmentModalPreview;
