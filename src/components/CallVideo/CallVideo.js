/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import CallVideoStream from './CallVideoStream';
import styles from './CallVideo.css';

export type Props = {
  ownVideos?: MediaSource[],
  theirVideos: MediaSource[]
};

class CallVideo extends PureComponent {
  props: Props;

  renderTheirVideos() {
    const { theirVideos } = this.props;

    return theirVideos.map((stream) => {
      return (
        // $FlowFixMe: stream.id exists
        <div key={stream.id} className={styles.videoContainer}>
          <CallVideoStream
            className={styles.video}
            stream={stream}
          />
        </div>
      );
    });
  }

  renderOwnVideos() {
    const { ownVideos } = this.props;

    if (!ownVideos) {
      return null;
    }

    const videos = ownVideos.map((stream) => {
      return (
        <CallVideoStream
          // $FlowFixMe: stream.id exists
          key={stream.id}
          className={styles.ownVideo}
          stream={stream}
        />
      );
    });

    return (
      <div className={styles.ownVideos}>
        {videos}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderTheirVideos()}
        {this.renderOwnVideos()}
      </div>
    );
  }
}

export default CallVideo;
