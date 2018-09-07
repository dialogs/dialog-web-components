/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AttachmentPreviewProps as Props } from '../types';
import type { DocumentType } from '../../../utils/getDocumentType';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getDocumentType from '../../../utils/getDocumentType';
import getExtensionType from '../../../utils/getExtensionType';
import getFilenameExtension from '../../../utils/getFilenameExtension';
import styles from './AttachmentPreview.css';

class AttachmentPreview extends PureComponent<Props> {
  getExtension(): string {
    const { file } = this.props;

    if (typeof file.name === 'string') {
      return getFilenameExtension(file.name);
    }

    return '?';
  }

  getFileType(): DocumentType {
    const { file } = this.props;

    if (typeof file.type === 'string' && Boolean(file.type)) {
      return getDocumentType(file.type);
    }

    return getExtensionType(this.getExtension());
  }

  renderPreview() {
    const { file } = this.props;

    return (
      <img
        src={URL.createObjectURL(file)}
        className={classNames(styles.image, this.props.imageClassName)}
      />
    );
  }

  renderDocument() {
    const type = this.getFileType();
    const extension = this.getExtension();

    return (
      <div className={classNames(styles.file, styles[type], this.props.fileClassName)}>
        {extension}
      </div>
    );
  }

  renderAttachment() {
    if (this.getFileType() === 'picture') {
      return this.renderPreview();
    }

    return this.renderDocument();
  }

  render() {
    return (
      <div className={classNames(styles.container, this.props.className)}>
        {this.renderAttachment()}
      </div>
    );
  }
}

export default AttachmentPreview;
