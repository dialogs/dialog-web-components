/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallVideoProps } from './types';
import React, { PureComponent } from 'react';
import styles from './CallVideo.css';

class CallVideo extends PureComponent {
  props: CallVideoProps;

  renderTheirVideos(): React.Element<any>[] {
    const { theirVideos } = this.props;

    return theirVideos.map((video, index) => {
      return (
        <div className={styles.video} key={`theirVideo_${index}`}>{video}</div>
      );
    });
  }

  renderOwnVideos(): ?React.Element<any> {
    const { isCameraOn, ownVideos, small } = this.props;

    if (!isCameraOn || small) {
      return null;
    }

    const videos = ownVideos.map((video, index) => {
      return (
        <div className={styles.video} key={`ownVideo_${index}`}>{video}</div>
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
