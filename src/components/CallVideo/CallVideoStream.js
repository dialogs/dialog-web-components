/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';

type Props = {
  className: string,
  stream: MediaSource
};

class CallVideoStream extends PureComponent {
  props: Props;
  video: ?HTMLVideoElement;

  componentDidMount() {
    if (this.video) {
      if ('srcObject' in this.video) {
        this.video.srcObject = this.props.stream;
      } else {
        this.video.src = URL.createObjectURL(this.props.stream);
      }

      this.video.play();
    }
  }

  componentWillUnmount() {
    if (this.video) {
      if ('srcObject' in this.video) {
        this.video.srcObject = null;
      } else {
        URL.revokeObjectURL(this.video.src);
        this.video.src = null;
      }

      this.video = null;
    }
  }

  setVideo = (video: ?HTMLVideoElement) => {
    this.video = video;
  };

  render() {
    return (
      <video
        ref={this.setVideo}
        className={this.props.className}
      />
    );
  }
}

export default CallVideoStream;
