/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps as Props } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import fullScreen from 'screenfull';
import Hover from '../Hover/Hover';
import CallVideo from '../CallVideo/CallVideo';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import CallControls from '../CallControls/CallControls';
import Icon from '../Icon/Icon';
import isOnCall from './utils/isOnCall';
import { hasVideos, hasTheirVideos } from './utils/hasVideo';
import styles from './Call.css';

type State = {
  isFullScreen: boolean,
  isControlsVisible: boolean
};

class CallChat extends PureComponent {
  props: Props;
  state: State;
  container: ?Node;

  constructor(props: Props) {
    super(props);

    this.state = {
      isFullScreen: false,
      isControlsVisible: true
    };
  }

  handleHover = (hover: boolean) => {
    const { call } = this.props;

    if (hasVideos(call)) {
      this.setState({ isControlsVisible: hover });
    }
  };

  handleFullScreen = () => {
    if (fullScreen.enabled && this.container) {
      fullScreen.toggle(this.container);
      this.setState((state) => {
        return {
          isFullScreen: !state.isFullScreen
        };
      });
    }
  };

  setContainer = (container: ?Node) => {
    this.container = container;
  };

  renderVideo() {
    const { call } = this.props;

    if (!hasVideos(call) || !isOnCall(call.state)) {
      return null;
    }

    return (
      <CallVideo
        isHovered={this.state.isControlsVisible}
        ownVideos={call.ownVideos}
        theirVideos={call.theirVideos}
      />
    );
  }

  renderInfo() {
    const { call } = this.props;

    if (hasTheirVideos(call)) {
      return null;
    }

    return (
      <div className={styles.info}>
        <CallAvatar
          animated={!isOnCall(call.state)}
          size={200}
          peer={call.peer}
          state={call.state}
        />
        <CallInfo
          className={styles.chatCallState}
          call={call}
          onCall={false}
          withVideo={false}
        />
      </div>
    );
  }

  renderControls() {
    const { call } = this.props;

    return (
      <CallControls
        onCall={isOnCall(call.state)}
        withVideo={hasVideos(call)}
        size="large"
        isVisible={this.state.isControlsVisible}
        state={call.state}
        isMuted={call.isMuted}
        isCameraOn={call.isCameraOn}
        isScreenSharingOn={call.isScreenSharingOn}
        onEnd={this.props.onEnd}
        onAnswer={this.props.onAnswer}
        onMuteToggle={this.props.onMuteToggle}
        onCameraToggle={this.props.onCameraToggle}
        onScreenShareToggle={this.props.onScreenShareToggle}
      />
    );
  }

  renderFullScreen() {
    if (!fullScreen.enabled) {
      return null;
    }

    return (
      <Icon
        glyph={this.state.isFullScreen ? 'minimize' : 'maximize'}
        className={styles.fullScreen}
        size={24}
        onClick={this.handleFullScreen}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} ref={this.setContainer}>
        <Hover onHover={this.handleHover} className={styles.hover}>
          <div className={styles.content}>
            {this.renderVideo()}
            {this.renderInfo()}
          </div>
          {this.renderFullScreen()}
          {this.renderControls()}
        </Hover>
      </div>
    );
  }
}

export default CallChat;
