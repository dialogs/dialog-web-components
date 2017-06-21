/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import styles from './Voice.css';

export type Props = {
  className?: string,
  duration: number,
  fileUrl: ?string,
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
        <AudioPlayer
          src={this.props.fileUrl}
          duration={this.props.duration}
          pending={this.props.isUploading}
        />
      </div>
    );
  }
}

export default Voice;
