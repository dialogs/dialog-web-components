/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { AttachmentMetaProps } from './types';
import React, { Component } from 'react';
import { Text } from '@dlghq/react-l10n';
import Switcher from '../Switcher/Switcher';
import getFilenameExtension from '../../utils/getFilenameExtension';
import getReadableFileSize from '../../utils/getReadableFileSize';
import styles from './AttachmentModal.css';

class AttachmentMeta extends Component {
  props: AttachmentMetaProps;

  handleIsDocumentChange: Function;

  constructor(props: AttachmentMetaProps) {
    super(props);

    this.handleIsDocumentChange = this.handleIsDocumentChange.bind(this);
  }

  shouldComponentUpdate(nextProps: AttachmentMetaProps) {
    return nextProps.attachment !== this.props.attachment;
  }

  handleIsDocumentChange(isDocument: boolean) {
    this.props.onChange({
      ...this.props.attachment,
      isDocument
    });
  }

  renderMethod() {
    const { attachment: { file, isDocument } } = this.props;

    if (file.type.indexOf('image/') !== 0) {
      return null;
    }

    return (
      <td className={styles.metaBlock}>
        <Text id="AttachmentModal.sending_method" tagName="div" className={styles.metaHeading} />
        <div>
          <Switcher
            id="send_as_file"
            name="send_as_file"
            className={styles.metaMethodSwitcher}
            value={isDocument}
            onChange={this.handleIsDocumentChange}
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
