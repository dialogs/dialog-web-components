/*
 * Copyright 2018 dialog LLC <info@dlg.im>
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

class Voice extends PureComponent<Props> {
  render() {
    const { isUploading, maxWidth, fileUrl, duration } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} style={{ width: maxWidth === 0 ? '100%' : maxWidth }}>
        <AudioPlayer src={fileUrl} duration={duration} pending={isUploading} />
      </div>
    );
  }
}

export default Voice;
