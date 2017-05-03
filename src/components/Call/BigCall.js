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
import CallHeader from './CallHeader';
import CallControls from './CallControls';
import CallVideo from './CallVideo';
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
    this.setState({ hover });
  };

  renderVideo(): ?React.Element<any> {
    const { call } = this.props;

    if (call.theirVideos.length) {
      return (
        <CallVideo
          small={false}
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
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onSizeToggle}>
        <Hover onHover={this.handleHover} className={styles.hoverElement}>
          <ModalBody className={styles.body}>
            <CallHeader
              isHover={this.state.hover}
              caller={caller}
              call={call}
              duration={duration}
              small={false}
              onSizeToggle={this.props.onSizeToggle}
            />
            {this.renderVideo()}
            <CallControls
              small={false}
              isHover={this.state.hover}
              state={call.state}
              isMuted={call.isMuted}
              isCameraOn={call.isCameraOn}
              onEnd={this.props.onEnd}
              onAnswer={this.props.onAnswer}
              onMuteToggle={this.props.onMuteToggle}
              onCameraToggle={this.props.onCameraToggle}
            />
          </ModalBody>
        </Hover>
      </Modal>
    );
  }
}


export default BigCall;
