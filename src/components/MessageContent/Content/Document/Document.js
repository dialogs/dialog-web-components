import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../../../Icon/Icon';
import styles from './Document.css';

class Document extends Component {
  static propTypes = {
    fileExtension: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    isUploading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isUploading: true
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.fileExtension !== this.props.fileExtension ||
           nextProps.fileName !== this.props.fileName ||
           nextProps.fileSize !== this.props.fileSize ||
           nextProps.fileUrl !== this.props.fileUrl ||
           nextProps.isUploading !== this.props.isUploading;
  }

  getDocumentType() {
    const { fileExtension } = this.props;

    switch (fileExtension) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return 'doc';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return 'picture';
      case 'mov':
      case 'mpeg':
      case 'avi':
        return 'media';
      default:
        return 'unknown';
    }
  }

  renderPreview() {
    const { fileExtension } = this.props;
    const docType = this.getDocumentType();
    const previewClassName = classnames(styles.preview, {
      [styles.doc]: docType === 'doc',
      [styles.picture]: docType === 'picture',
      [styles.media]: docType === 'media'
    });

    return (
      <div className={previewClassName}>
        {fileExtension}
      </div>
    );
  }

  renderInfo() {
    const { fileName, fileSize } = this.props;

    return (
      <div className={styles.info}>
        <div className={styles.filename}>{fileName}</div>
        <div className={styles.sizeBlock}>
          <Icon glyph="arrow_downward" className={styles.downloadArrow} />
          <span className={styles.size}>{fileSize}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderPreview()}
        {this.renderInfo()}
      </div>
    );
  }
}

export default Document;
