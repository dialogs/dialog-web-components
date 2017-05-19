/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import VoicePlayer from './VoicePlayer';
import styles from './Voice.css';

export type Props = {
  className?: string,
  duration: number,
  fileUrl: ?string,
  // fileName: ?string,
  // fileSize: ?string,
  // fileExtension: ?string,
  isUploading: boolean,
  maxWidth: number
};

class Voice extends PureComponent {
  props: Props;

  render() {
    const { isUploading, maxWidth } = this.props;
    const className = classNames(styles.container, {
      [styles.uploading]: isUploading
    }, this.props.className);

    return (
      <div className={className} style={{ width: maxWidth }}>
        <VoicePlayer
          short={maxWidth < 300}
          isUploading={isUploading}
          fileUrl={this.props.fileUrl}
          duration={this.props.duration}
        />
      </div>
    );
  }
}

export default Voice;
