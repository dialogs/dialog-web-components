/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AttachmentMetaProps } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import { getReadableFileSize } from '@dlghq/dialog-utils';
import getFilenameExtension from '../../utils/getFilenameExtension';
import Switcher from '../Switcher/Switcher';
import styles from './AttachmentModal.css';

class AttachmentMeta extends PureComponent {
  props: AttachmentMetaProps;

  handleSendAsFileChange = (): void => {
    this.props.onSendAsFileChange(!this.props.sendAsFile);
  };

  renderMethod() {
    const { attachment: { isDocument } } = this.props;

    return (
      <td className={styles.metaBlock}>
        <Text id="AttachmentModal.sending_method" tagName="div" className={styles.metaHeading} />
        <div className={styles.metaText}>
          <Switcher
            id="send_as_file"
            name="send_as_file"
            className={styles.metaMethodSwitcher}
            value={isDocument ? true : this.props.sendAsFile}
            disabled={isDocument}
            onChange={this.handleSendAsFileChange}
          >
            <Text id="AttachmentModal.send_as_file" />
          </Switcher>
        </div>
      </td>
    );
  }

  render() {
    const { attachment: { file } } = this.props;

    const name = typeof file.name === 'string' ? file.name : '';
    const size = getReadableFileSize(file.size);
    const extension = getFilenameExtension(name);

    return (
      <table className={styles.meta}>
        <tbody>
          <tr>
            <td className={styles.metaBlock}>
              <Text id="AttachmentModal.filename" tagName="div" className={styles.metaHeading} />
              <div className={styles.metaText}>{name}</div>
            </td>
            <td className={styles.metaBlock}>
              <Text id="AttachmentModal.filesize" tagName="div" className={styles.metaHeading} />
              <div className={styles.metaText}>{size}</div>
            </td>
          </tr>
          <tr>
            <td className={styles.metaBlock}>
              <Text id="AttachmentModal.filetype" tagName="div" className={styles.metaHeading} />
              <div className={styles.metaFileType}>{extension}</div>
            </td>
            {this.renderMethod()}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AttachmentMeta;
