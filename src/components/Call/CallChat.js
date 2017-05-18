/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Hover from '../Hover/Hover';
import CallVideo from '../CallVideo/CallVideo';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import CallControls from '../CallControls/CallControls';
import isOnCall from './utils/isOnCall';
import { hasVideos, hasTheirVideos } from './utils/hasVideo';
import styles from './Call.css';

type State = {
  hover: boolean
};

class CallChat extends PureComponent {
  props: CallProps;
  state: State;

  constructor(props: CallProps) {
    super(props);

    this.state = {
      hover: true
    };
  }

  handleHover = (hover: boolean) => {
    const { call } = this.props;

    if (hasVideos(call)) {
      this.setState({ hover });
    }
  };

  renderVideo(): ?React.Element<any> {
    const { call } = this.props;

    if (!hasVideos(call) || !isOnCall(call.state)) {
      return null;
    }

    return (
      <CallVideo
        isHovered={this.state.hover}
        ownVideos={call.ownVideos}
        theirVideos={call.theirVideos}
      />
    );
  }

  renderInfo(): ?React.Element<any> {
    const { call, caller, duration } = this.props;

    if (hasTheirVideos(call)) {
      return null;
    }

    return (
      <div className={styles.info}>
        <CallAvatar
          animated={!isOnCall(call.state)}
          size={200}
          state={call.state}
          caller={caller}
        />
        <CallInfo
          className={styles.chatCallState}
          onCall={false}
          call={call}
          caller={caller}
          duration={duration}
          withVideo={false}
        />
      </div>
    );
  }

  renderControls(): React.Element<any> {
    const { call } = this.props;

    return (
      <CallControls
        onCall={isOnCall(call.state)}
        withVideo={hasVideos(call)}
        size="large"
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
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Hover onHover={this.handleHover} className={styles.hover}>
          <div className={styles.content}>
            {this.renderVideo()}
            {this.renderInfo()}
          </div>
          {this.renderControls()}
        </Hover>
      </div>
    );
  }
}

export default CallChat;
