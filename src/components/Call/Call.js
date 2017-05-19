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

  handleEnd = (): void => {
    if (this.props.id) {
      this.props.onEnd(this.props.id);
    }
  };

  handleAnswer = (): void => {
    if (this.props.id) {
      this.props.onAnswer(this.props.id);
    }
  };

  handleMuteToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onMuteToggle(id, !call.isMuted);
    }
  };

  handleCameraToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onCameraToggle(id, !call.isCameraOn);
    }
  };

  handleScreenShareToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onScreenShareToggle(id, !call.isScreenSharingOn);
    }
  };

  render(): ?React.Element<any> {
    const { id, call, caller, small, isVideoEnabled, isScreenSharingEnabled } = this.props;

    if (!id || !call || !caller) {
      return null;
    }

    const ChildCall = small ? CallWindow : CallChat;

    return (
      <ChildCall
        call={call}
        caller={caller}
        onEnd={this.handleEnd}
        onAnswer={this.handleAnswer}
        onResize={this.props.onResize}
        onMuteToggle={this.handleMuteToggle}
        onCameraToggle={isVideoEnabled ? this.handleCameraToggle : null}
        onScreenShareToggle={isScreenSharingEnabled ? this.handleScreenShareToggle : null}
      />
    );
  }
}

export default Call;
