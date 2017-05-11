/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import Hover from '../Hover/Hover';
import CallHeader from '../CallHeader/CallHeader';
import CallControls from '../CallControls/CallControls';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import CallVideo from '../CallVideo/CallVideo';
import Icon from '../Icon/Icon';
import styles from './Call.css';

type State = {
  hover: boolean
};

class BigCall extends PureComponent {
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
    return Boolean(this.props.call.ownVideos.length || this.props.call.theirVideos.length);
  };

  renderCallInfo(): ?React.Element<any> {
    const { caller, duration, call } = this.props;

    if (this.isCallWithVideo()) {
      return null;
    }

    return (
      <div className={styles.info}>
        <CallAvatar
          small={false}
          isAudioCall
          state={call.state}
          caller={caller}
        />
        <CallInfo
          small={false}
          call={call}
          isAudioCall
          caller={caller}
          duration={duration}
        />
        <Icon
          flat
          size={24}
          glyph="minimize"
          className={styles.toggleSize}
          onClick={this.props.onSizeToggle}
        />
      </div>
    );
  }

  renderHeader(): ?React.Element<any> {
    const { caller, duration, call } = this.props;

    if (this.isCallWithVideo()) {
      return (
        <CallHeader
          isAudioCall={false}
          isHover={this.state.hover}
          caller={caller}
          call={call}
          duration={duration}
          small={false}
          onSizeToggle={this.props.onSizeToggle}
        />
      );
    }

    return null;
  }

  renderVideo(): ?React.Element<any> {
    const { call: { ownVideos, theirVideos } } = this.props;

    if (this.isCallWithVideo()) {
      return (
        <CallVideo
          small={false}
          ownVideos={ownVideos}
          theirVideos={theirVideos}
        />
      );
    }

    return null;
  }

  render() {
    const { call, isVideoEnabled, isScreenSharingEnabled, isOnCall } = this.props;
    const isVideoCall = this.isCallWithVideo();
    const className = classNames(styles.container, {
      [styles.video]: isVideoCall,
      [styles.inChat]: isOnCall
    }, this.props.className);

    const Wrapper = isOnCall ? 'div' : Modal;
    const handlers = isOnCall ? {} : { onClose: this.props.onSizeToggle };

    return (
      <Wrapper className={className} {...handlers} >
        <Hover onHover={this.handleHover} className={styles.hoverElement}>
          <ModalBody className={styles.body}>
            {this.renderHeader()}
            {this.renderCallInfo()}
            {this.renderVideo()}
            <CallControls
              isOnCall={isOnCall}
              small={false}
              isHover={this.state.hover}
              isAudioCall={!isVideoCall}
              state={call.state}
              isMuted={call.isMuted}
              isCameraOn={call.isCameraOn}
              isScreenShareOn={call.isScreenSharingOn}
              onEnd={this.props.onEnd}
              onAnswer={this.props.onAnswer}
              onMuteToggle={this.props.onMuteToggle}
              onCameraToggle={this.props.onCameraToggle}
              onScreenShareToggle={this.props.onScreenShareToggle}
              isVideoEnabled={isVideoEnabled}
              isScreenSharingEnabled={isScreenSharingEnabled}
              onSizeToggle={this.props.onSizeToggle}
            />
          </ModalBody>
        </Hover>
      </Wrapper>
    );
  }
}


export default BigCall;
