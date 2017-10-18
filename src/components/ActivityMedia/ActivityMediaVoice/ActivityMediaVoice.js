/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import styles from './ActivityMediaVoice.css';

type Props = {
  url: ?string,
  duration: ?number,
  sender: ?string
};

class ActivityMediaVoice extends PureComponent {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <AudioPlayer
          className={styles.audio}
          src={this.props.url}
          duration={this.props.duration}
          sender={this.props.sender}
        />
      </div>
    );
  }
}

export default ActivityMediaVoice;
