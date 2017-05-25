/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps as Props } from './types';
import React, { PureComponent } from 'react';
import CallChat from './CallChat';
import CallWindow from './CallWindow';

class Call extends PureComponent {
  props: Props;

  handleEnd = () => {
    const { call } = this.props;
    if (call) {
      this.props.onEnd(call.id);
    }
  };

  handleAnswer = () => {
    const { call } = this.props;
    if (call) {
      this.props.onAnswer(call.id);
    }
  };

  handleMuteToggle = () => {
    const { call } = this.props;
    if (call) {
      this.props.onMuteToggle(call.id, !call.isMuted);
    }
  };

  handleCameraToggle = () => {
    const { call } = this.props;
    if (call) {
      this.props.onCameraToggle(call.id, !call.isCameraOn);
    }
  };

  handleScreenShareToggle = () => {
    const { call } = this.props;
    if (call) {
      this.props.onScreenShareToggle(call.id, !call.isScreenSharingOn);
    }
  };

  render() {
    const { call, small, isVideoEnabled, isScreenSharingEnabled } = this.props;

    if (!call) {
      return null;
    }

    const ChildCall = small ? CallWindow : CallChat;

    return (
      <ChildCall
        call={call}
        onEnd={this.handleEnd}
        onAnswer={this.handleAnswer}
        onResize={this.props.onResize}
        onGoToPeer={this.props.onGoToPeer}
        onMuteToggle={this.handleMuteToggle}
        onCameraToggle={isVideoEnabled ? this.handleCameraToggle : null}
        onScreenShareToggle={isScreenSharingEnabled ? this.handleScreenShareToggle : null}
      />
    );
  }
}

export default Call;
