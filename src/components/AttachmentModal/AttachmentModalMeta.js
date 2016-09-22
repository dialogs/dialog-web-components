/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { Text } from '@dlghq/react-l10n';
import getExtensionFromFilename from '../../utils/getExtensionFromFilename';
import getReadableFileSize from '../../utils/getReadableFileSize';
import styles from './AttachmentModal.css';

class AttachmentModalMeta extends Component {
  static propTypes = {
    attachment: PropTypes.any.isRequired
  };

  renderMethod() {
    const { attachment } = this.props;

    if (attachment.type.indexOf('image/') === 0) {
      return (
        <td className={styles.metaBlock}>
          <Text id="AttachmentModal.sending_method" tagName="div" className={styles.metaHeading} />
          <div>
            <Switcher id="send_as_file" value={false} className={styles.metaMethodSwitcher} />
            <Text id="AttachmentModal.send_as_file" className={styles.metaMethodText} />
          </div>
        </td>
      );
    }

    return null;
  }

  render() {
    const { attachment } = this.props;

    return (
      <table className={styles.meta}>
        <tbody>
          <tr>
            <td className={styles.metaBlock}>
              <Text id="AttachmentModal.filename" tagName="div" className={styles.metaHeading} />
              <div className={styles.metaText}>{attachment.name}</div>
            </td>
            <td className={styles.metaBlock}>
              <Text id="AttachmentModal.filesize" tagName="div" className={styles.metaHeading} />
              <div className={styles.metaText}>{getReadableFileSize(attachment.size)}</div>
            </td>
          </tr>
          <tr>
            <td className={styles.metaBlock}>
              <Text id="AttachmentModal.filetype" tagName="div" className={styles.metaHeading} />
              <div className={styles.metaFileType}>{getExtensionFromFilename(attachment.name)}</div>
            </td>
            {this.renderMethod()}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AttachmentModalMeta;
