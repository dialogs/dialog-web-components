/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallState } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from './CallControls.css';

export type Props = {
  state: CallState,
  size: 'normal' | 'large',
  isVisible: boolean,
  isMuted?: boolean,
  onCall: boolean,
  withVideo: boolean,
  isCameraOn?: boolean,
  isScreenSharingOn?: boolean,
  onEnd: () => mixed,
  onAnswer: () => mixed,
  onMuteToggle?: () => mixed,
  onCameraToggle?: ?() => mixed,
  onScreenShareToggle?: ?() => mixed
};

class CallControls extends PureComponent {
  props: Props;

  render() {
    const { state, size, isVisible, onCall, withVideo } = this.props;
    const className = classNames(styles.container, {
      [styles.hide]: !isVisible,
      [styles.onCall]: onCall,
      [styles.withVideo]: withVideo,
      [styles.large]: size === 'large'
    });
    const buttonClassName = classNames(styles.button, {
      [styles.bigButton]: size === 'large'
    });

    const buttons = [];

    if (state === 'ringing_incoming') {
      buttons.push(
        <IconButton
          flat
          key="answer"
          size="normal"
          theme="success"
          glyph="call"
          className={buttonClassName}
          onClick={this.props.onAnswer}
        />
      );
    }

    buttons.push(
      <IconButton
        flat
        key="end"
        size="normal"
        theme="danger"
        glyph="call_end"
        className={buttonClassName}
        onClick={this.props.onEnd}
      />
    );

    if (this.props.onMuteToggle) {
      buttons.push(
        <IconButton
          flat
          key="mic"
          size="normal"
          theme="primary"
          glyph={this.props.isMuted ? 'mic_material_off' : 'mic_material'}
          className={buttonClassName}
          onClick={this.props.onMuteToggle}
        />
      );
    }


    if (this.props.onCameraToggle) {
      buttons.push(
        <IconButton
          flat
          key="camera"
          size="normal"
          theme="info"
          glyph={this.props.isCameraOn ? 'videocam_off' : 'videocam'}
          className={buttonClassName}
          onClick={this.props.onCameraToggle}
        />
      );
    }

    if (this.props.onScreenShareToggle) {
      buttons.push(
        <IconButton
          flat
          key="screen_share"
          size="normal"
          theme="info"
          glyph={this.props.isScreenSharingOn ? 'screen_share_stop' : 'screen_share'}
          className={buttonClassName}
          onClick={this.props.onScreenShareToggle}
        />
      );
    }

    return (
      <div className={className}>
        {buttons}
      </div>
    );
  }
}

export default CallControls;
