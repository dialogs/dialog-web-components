/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AttachmentMetaProps as Props } from '../types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { getReadableFileSize } from '@dlghq/dialog-utils';
import getFilenameExtension from '../../../utils/getFilenameExtension';
import Switcher from '../../Switcher/Switcher';
import styles from './AttachmentMeta.css';

class AttachmentMeta extends PureComponent<Props> {
  handleSendAsFileChange = (): void => {
    this.props.onSendAsFileChange(!this.props.sendAsFile);
  };

  renderMethod() {
    const {
      attachment: { isDocument }
    } = this.props;

    return (
      <td className={styles.block}>
        <Text id="AttachmentModal.sending_method" tagName="div" className={styles.heading} />
        <div className={styles.text}>
          <Switcher
            id="attachment_send_as_file"
            name="send_as_file"
            className={styles.switcher}
            value={isDocument ? true : this.props.sendAsFile}
            disabled={isDocument}
            onChange={this.handleSendAsFileChange}
            label="AttachmentModal.send_as_file"
          />
        </div>
      </td>
    );
  }

  render() {
    const {
      attachment: { file }
    } = this.props;

    const name = typeof file.name === 'string' ? file.name : '';
    const size = getReadableFileSize(file.size);
    const extension = getFilenameExtension(name);

    return (
      <table className={classNames(styles.container, this.props.className)}>
        <tbody>
          <tr>
            <td className={styles.block}>
              <Text id="AttachmentModal.filename" tagName="div" className={styles.heading} />
              <div className={styles.text}>
                {name}
              </div>
            </td>
            <td className={styles.block}>
              <Text id="AttachmentModal.filesize" tagName="div" className={styles.heading} />
              <div className={styles.text}>
                {size}
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.block}>
              <Text id="AttachmentModal.filetype" tagName="div" className={styles.heading} />
              <div className={styles.type}>
                {extension}
              </div>
            </td>
            {this.renderMethod()}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AttachmentMeta;
