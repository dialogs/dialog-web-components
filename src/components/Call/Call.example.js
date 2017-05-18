/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
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
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then((stream) => {
      callback({
        stream,
        isMirrored: true
      });
    }).catch((error) => {
      console.error(error);
    });
  }
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

  constructor(props: Props) {
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
        startTime: 0,
        members: [],
        ownVideos: [],
        theirVideos: [],
        isMuted: false,
        isOutgoing: true,
        isCameraOn: false,
        isScreenSharingOn: false
      },
      caller: {
        id: 1,
        name: 'Nikita',
        placeholder: 'green',
        avatar: 'https://avatars0.githubusercontent.com/u/3505878',
        about: null,
        bigAvatar: null,
        emails: [],
        phones: [],
        isBlocked: false,
        isBot: false,
        isContact: true,
        timeZone: '',
        isOnline: false,
        nick: 'nkt',
        sex: 'unknown'
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
    const { call } = this.state;

    if (call) {
      call.ownVideos.forEach(({ stream }) => {
        // $FlowFixMe: webrtc support
        for (const track of stream.getTracks()) {
          track.stop();
        }
      });

      call.theirVideos.forEach(({ stream }) => {
        // $FlowFixMe: webrtc support
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

  handleMuteToggle = () => {
    const { call } = this.state;

    if (call) {
      this.setState({
        call: {
          ...call,
          isMuted: !call.isMuted
        }
      });
    }
  };

  handleCameraToggle = () => {
    const { call } = this.state;

    if (call) {
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
    }
  };

  handleScreenShareToggle = () => {
    const { call } = this.state;

    if (call) {
      if (call.isScreenSharingOn) {
        this.setState({
          call: {
            ...call,
            isScreenSharingOn: false
          }
        });
      } else {
        this.setState({
          call: {
            ...call,
            isScreenSharingOn: true
          }
        });
      }
    }
  };

  handleResize = (dimensions: $FlowIssue) => {
    console.debug('[call] resize', dimensions); // eslint-disable-line
  };

  handleSizeToggle = () => {
    this.setState({ small: !this.state.small });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleCall} theme="primary" size="small">Call</Button>
        <div style={{ width: 6, display: 'inline-block' }} />
        <Button onClick={this.handleSizeToggle} theme="primary" size="small">Toggle size</Button>
        <div style={{ height: 500, width: '100%' }}>
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
            onResize={this.handleResize}
            onMuteToggle={this.handleMuteToggle}
            onCameraToggle={this.handleCameraToggle}
            onScreenShareToggle={this.handleScreenShareToggle}
          />
        </div>
      </div>
    );
  }
}

export default CallExample;
