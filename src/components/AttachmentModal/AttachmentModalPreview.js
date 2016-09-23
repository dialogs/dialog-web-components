/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import getExtensionFromFilename from '../../utils/getExtensionFromFilename';
import styles from './AttachmentModal.css';

class AttachmentModalPreview extends Component {
  static propTypes = {
    attachment: PropTypes.any.isRequired
  };

  getDocumentType(extension) {
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return 'document';
      case 'mov':
      case 'mpeg':
      case 'avi':
      case 'mkv':
        return 'media';
      default:
        return 'unknown';
    }
  }

  renderFilePreview() {
    const { attachment } = this.props;
    const extension = getExtensionFromFilename(attachment.name);
    const type = this.getDocumentType(extension);
    const className = classNames(styles.previewDocument, styles[type]);

    return (
      <div className={className}>{extension}</div>
    );
  }

  render() {
    const { attachment } = this.props;

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

    return (
      <div className={styles.preview}>
        {this.renderFilePreview()}
      </div>
    );
  }
}

export default AttachmentModalPreview;
