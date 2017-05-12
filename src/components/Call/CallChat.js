/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Hover from '../Hover/Hover';
import CallVideo from '../CallVideo/CallVideo';
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
    if (this.isCallWithVideo()) {
      this.setState({ hover });
    }
  };

  isCallWithVideo = (): boolean => {
    return Boolean(this.props.call.ownVideos.length || this.props.call.theirVideos.length);
  };


  renderVideo(): ?React.Element<any> {
    const { call: { ownVideos, theirVideos } } = this.props;

    if (this.isCallWithVideo()) {
      return (
        <CallVideo
          ownVideos={ownVideos}
          theirVideos={theirVideos}
        />
      );
    }

    return null;
  }

  renderAvatar(): React.Element<any> {
    const { caller, duration, call } = this.props;

    if (this.isCallWithVideo()) {
      return null;
    }

    return (
      <CallAvatar
        small={false}
        isAudioCall
        state={call.state}
        caller={caller}
      />
    );

  }

  renderInfo(): React.Element<any> {

  }

  renderControls(): React.Element<any> {

  }

  render() {
    const { call, isVideoEnabled, isScreenSharingEnabled } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Hover onHover={this.handleHover} className={styles.hover}>
          {this.renderVideo()}
          {this.renderAvatar()}
          {this.renderInfo()}
          {this.renderControls()}
        </Hover>
      </div>
    );
  }
}

export default CallChat;
