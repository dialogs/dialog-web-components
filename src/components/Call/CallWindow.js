/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps as Props } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Hover from '../Hover/Hover';
import CallControls from '../CallControls/CallControls';
import CallVideo from '../CallVideo/CallVideo';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import CallHeader from '../CallHeader/CallHeader';
import getWindowSize from './utils/getWindowSize';
import isOnCall from './utils/isOnCall';
import { hasTheirVideos } from './utils/hasVideo';
import styles from './Call.css';

type State = {
  hover: boolean
};

class CallWindow extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      hover: true
    };
  }

  componentDidMount() {
    const { call } = this.props;
    this.props.onResize(getWindowSize(call));
  }

  componentDidUpdate() {
    const { call } = this.props;
    this.props.onResize(getWindowSize(call));
  }

  handleGoToPeer = () => {
    this.props.onGoToPeer(this.props.call.peer.peer);
  };

  handleHover = (hover: boolean) => {
    const { call } = this.props;

    if (hasTheirVideos(call) && isOnCall(call.state)) {
      this.setState({ hover });
    }
  };

  renderHeader() {
    const { call } = this.props;
    const withVideo = hasTheirVideos(call);

    return (
      <CallHeader
        withVideo={withVideo}
        call={call}
        isVisible={this.state.hover}
        onClick={this.handleGoToPeer}
      />
    );
  }

  renderVideo() {
    const { call } = this.props;

    if (hasTheirVideos(call)) {
      return (
        <CallVideo theirVideos={call.theirVideos} />
      );
    }

    return null;
  }

  renderContent() {
    const { call } = this.props;

    if (!isOnCall(call.state)) {
      return (
        <div className={styles.content}>
          <div className={styles.info}>
            <CallAvatar
              animated
              size={136}
              peer={call.peer}
              state={call.state}
              onClick={this.handleGoToPeer}
            />
            <CallInfo
              className={styles.callState}
              call={call}
              onCall={false}
              withVideo={false}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.content}>
        {this.renderHeader()}
        {this.renderVideo()}
      </div>
    );
  }

  renderControls() {
    const { call } = this.props;

    return (
      <CallControls
        onCall={isOnCall(call.state)}
        withVideo={hasTheirVideos(call)}
        size="normal"
        isVisible={this.state.hover}
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

  render() {
    const { call } = this.props;
    const className = classNames(styles.window, this.props.className);
    const style = getWindowSize(call);

    return (
      <div className={className} style={style}>
        <Hover onHover={this.handleHover} className={styles.hover}>
          {this.renderContent()}
          {this.renderControls()}
        </Hover>
      </div>
    );
  }
}

export default CallWindow;
