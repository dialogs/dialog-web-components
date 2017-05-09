/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { User, Call as CallType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import Button from '../Button/Button';
import Call from './Call';

type Props = {
  withVideo?: boolean,
  withScreenSharing?: boolean
};

type State = {
  id: ?string,
  call: ?CallType,
  caller: ?User,
  small: boolean
};

function getVideoStream(callback) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then((stream) => {
    callback(stream);
  }).catch((error) => {
    console.error(error);
  });
}

class CallExample extends PureComponent {
  props: Props;
  state: State;

  static getInitialState(): State {
    return {
      id: null,
      call: null,
      caller: null,
      small: false
    };
  }

  constructor(props) {
    super(props);

    this.state = CallExample.getInitialState();
  }

  handleCall = () => {
    this.setState({
      id: String(Math.random()),
      call: {
        state: 'ringing_outgoing',
        peer: {
          id: 1,
          type: 'user'
        },
        members: [],
        ownVideos: [],
        theirVideos: [],
        isMuted: false,
        isOutgoing: true,
        isCameraOn: false,
        isScreenShareOn: false
      },
      caller: {
        id: 1,
        name: 'Nikita',
        placeholder: 'red',
        avatar: 'https://avatars0.githubusercontent.com/u/3505878'
      }
    }, () => {
      setTimeout(this.handleConnecting, 2000);
    });
  };

  handleConnecting = () => {
    this.setState({
      call: {
        ...this.state.call,
        state: 'connecting'
      }
    }, () => {
      setTimeout(this.handleInProgress, 1000);
    });
  };

  handleEnd = () => {
    if (this.state.call) {
      this.state.call.ownVideos.forEach((stream) => {
        for (const track of stream.getTracks()) {
          track.stop();
        }
      });
      this.state.call.theirVideos.forEach((stream) => {
        for (const track of stream.getTracks()) {
          track.stop();
        }
      });
    }

    this.setState(CallExample.getInitialState());
  };

  handleAnswer = () => {
    setTimeout(this.handleInProgress, 2000);
  };

  handleInProgress = () => {
    this.setState({
      call: {
        ...this.state.call,
        state: 'in_progress'
      }
    });
  };

  handleSizeToggle = () => {
    this.setState({ small: !this.state.small });
  };

  handleMuteToggle = () => {
    this.setState({
      call: {
        ...this.state.call,
        isMuted: !this.state.call.isMuted
      }
    });
  };

  handleCameraToggle = () => {
    const { call } = this.state;

    if (call.isCameraOn) {
      this.setState({
        call: {
          ...call,
          isCameraOn: false,
          ownVideos: []
        }
      });
    } else {
      this.setState({
        call: {
          ...call,
          isCameraOn: true
        }
      }, () => {
        getVideoStream((stream) => {
          this.setState({
            call: {
              ...this.state.call,
              ownVideos: [stream],
              theirVideos: [stream]
            }
          });
        });
      });
    }
  };

  handleScreenShareToggle = () => {
    const { call } = this.state;

    if (call.isScreenShareOn) {
      this.setState({
        call: {
          ...call,
          isScreenShareOn: false
        }
      });
    } else {
      this.setState({
        call: {
          ...call,
          isScreenShareOn: true
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleCall} theme="primary">Call</Button>

        <Call
          key={this.state.id}
          id={this.state.id}
          call={this.state.call}
          caller={this.state.caller}
          small={this.state.small}
          isVideoEnabled={this.props.withVideo}
          isScreenSharingEnabled={this.props.withScreenSharing}
          onEnd={this.handleEnd}
          onAnswer={this.handleAnswer}
          onSizeToggle={this.handleSizeToggle}
          onMuteToggle={this.handleMuteToggle}
          onCameraToggle={this.handleCameraToggle}
          onScreenShareToggle={this.handleScreenShareToggle}
        />
      </div>
    );
  }
}

export default CallExample;
