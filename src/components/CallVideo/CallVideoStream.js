/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './CallVideo.css';

type Props = {
  className: string,
  stream: MediaSource,
  isMirrored: boolean
};

class CallVideoStream extends PureComponent {
  props: Props;
  video: HTMLVideoElement;

  componentDidMount() {
    if ('srcObject' in this.video) {
      this.video.srcObject = this.props.stream;
    } else {
      this.video.src = URL.createObjectURL(this.props.stream);
    }

    this.video.play();
  }

  componentWillUnmount() {
    if ('srcObject' in this.video) {
      this.video.srcObject = null;
    } else {
      URL.revokeObjectURL(this.video.src);
    }
  }

  setVideo = (video: HTMLVideoElement) => {
    this.video = video;
  };

  render() {
    const className = classNames(
      this.props.className,
      this.props.isMirrored ? styles.mirrored : null
    );

    return (
      <video
        ref={this.setVideo}
        className={className}
      />
    );
  }
}

export default CallVideoStream;
