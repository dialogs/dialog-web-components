/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallHeader from '../CallHeader/CallHeader';
import CallVideo from '../CallVideo/CallVideo';
import CallControls from '../CallControls/CallControls';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import Hover from '../Hover/Hover';
import Icon from '../Icon/Icon';
import styles from './Call.css';

type State = {
  hover: boolean
};

class SmallCall extends PureComponent {
  props: CallProps;
  state: State;

  constructor(props: CallProps) {
    super(props);

    this.state = {
      hover: true
    };
  }

  handleHover = (hover: boolean) => {
    if (this.isCallWithVideo()) {
      this.setState({ hover });
    }
  };

  isCallWithVideo = (): boolean => {
    return Boolean(this.props.call.theirVideos.length);
  };

  renderHeader(): ?React.Element<any> {
    const { caller, call, duration } = this.props;

    if (this.isCallWithVideo()) {
      return (
        <CallHeader
          small
          isAudioCall={false}
          isHover={this.state.hover}
          caller={caller}
          call={call}
          duration={duration}
          onSizeToggle={this.props.onSizeToggle}
        />
      );
    }

    return null;
  }

  renderCallInfo(): ?React.Element<any> {
    const { caller, duration, call } = this.props;

    if (this.isCallWithVideo()) {
      return null;
    }

    return (
      <div className={styles.infoSmall}>
        <CallAvatar
          small
          isAudioCall
          state={call.state}
          caller={caller}
        />
        <CallInfo
          small
          call={call}
          isAudioCall
          caller={caller}
          duration={duration}
        />
        <Icon
          flat
          size={18}
          glyph="maximize"
          className={styles.toggleSize}
          onClick={this.props.onSizeToggle}
        />
      </div>
    );
  }

  renderVideo(): ?React.Element<any> {
    const { call } = this.props;

    if (this.isCallWithVideo()) {
      return (
        <CallVideo
          small
          isCameraOn={call.isCameraOn}
          ownVideos={call.ownVideos}
          theirVideos={call.theirVideos}
        />
      );
    }

    return null;
  }

  render() {
    const { call, isVideoEnabled, isScreenSharingEnabled } = this.props;
    const isVideoCall = this.isCallWithVideo();
    const className = classNames(styles.container, styles.small, {
      [styles.video]: isVideoCall
    }, this.props.className);

    return (
      <div className={className}>
        <Hover onHover={this.handleHover} className={styles.hoverElement}>
          {this.renderHeader()}
          {this.renderCallInfo()}
          {this.renderVideo()}
          <CallControls
            small
            isHover={this.state.hover}
            state={call.state}
            isMuted={call.isMuted}
            isCameraOn={call.isCameraOn}
            isScreenShareOn={call.isScreenSharingOn}
            isVideoEnabled={isVideoEnabled}
            isScreenSharingEnabled={isScreenSharingEnabled}
            onEnd={this.props.onEnd}
            onAnswer={this.props.onAnswer}
            onSizeToggle={this.props.onSizeToggle}
            onMuteToggle={this.props.onMuteToggle}
            onCameraToggle={this.props.onCameraToggle}
            isAudioCall={!isVideoCall}
            onScreenShareToggle={this.props.onScreenShareToggle}
          />
        </Hover>
      </div>
    );
  }
}

export default SmallCall;
