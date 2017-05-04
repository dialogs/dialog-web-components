/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import CallHeader from '../CallHeader/CallHeader';
import CallVideo from '../CallVideo/CallVideo';
import CallControls from '../CallControls/CallControls';
import Hover from '../Hover/Hover';
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
    this.setState({ hover });
  };


  renderVideo(): ?React.Element<any> {
    const { call } = this.props;

    if (call.theirVideos.length) {
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
    const { caller, call, duration } = this.props;
    const className = classNames(styles.container, styles.small, this.props.className);

    return (
      <Draggable>
        <div className={className}>
          <Hover onHover={this.handleHover} className={styles.hoverElement}>
            <CallHeader
              small
              isHover={this.state.hover}
              caller={caller}
              call={call}
              duration={duration}
              onSizeToggle={this.props.onSizeToggle}
            />
            {this.renderVideo()}
            <CallControls
              small
              isHover={this.state.hover}
              state={call.state}
              isMuted={call.isMuted}
              isCameraOn={call.isCameraOn}
              onEnd={this.props.onEnd}
              onAnswer={this.props.onAnswer}
              onSizeToggle={this.props.onSizeToggle}
              onMuteToggle={this.props.onMuteToggle}
              onCameraToggle={this.props.onCameraToggle}
            />
          </Hover>
        </div>
      </Draggable>
    );
  }
}

export default SmallCall;
