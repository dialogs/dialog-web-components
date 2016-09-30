/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentVoice } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import styles from './Voice.css';

class VoicePlayer extends Component {
  props: MessageContentVoice;

  // constructor(props:  MessageContentVoice) {
  //   super(props);
  // }

  shouldComponentUpdate(nextProps: MessageContentVoice) {
    return nextProps !== this.props;
  }

  render() {
    const { isUploading } = this.props;

    if (isUploading) {
      return null;
    }

    return (
      <div className={styles.player}>
        <Icon
          glyph="play_arrow"
          className={styles.playerIcon}
          theme="primary"
          size="large"
          inverted
        />
      </div>
    );
  }
}

export default VoicePlayer;
