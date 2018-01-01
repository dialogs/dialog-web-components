/**
 * Copyright 2018 dialog LLC <info@dlg.im>
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

class CallVideoStream extends PureComponent<Props> {
  video: ?HTMLVideoElement;

  componentDidMount() {
    const { video } = this;
    if (video) {
      if ('srcObject' in video) {
        video.srcObject = this.props.stream;
      } else {
        video.src = URL.createObjectURL(this.props.stream);
      }

      video.play();
    }
  }

  componentWillUnmount() {
    const { video } = this;
    if (video) {
      if ('srcObject' in video) {
        video.srcObject = null;
      } else {
        URL.revokeObjectURL(video.src);
      }
    }
  }

  setVideo = (video: *) => {
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
