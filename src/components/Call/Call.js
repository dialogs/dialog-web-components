/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps as Props } from './types';
import React, { PureComponent } from 'react';
import BigCall from './BigCall';
import SmallCall from './SmallCall';

export type State = {
  duration: number
};

class Call extends PureComponent {
  props: Props;
  state: State;
  timer: ?number;

  constructor(props: Props) {
    super(props);

    this.state = {
      duration: 0
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.call && nextProps.call) {
      const { state } = this.props.call;
      const { state: nextState } = nextProps.call;

      if (nextState === 'in_progress' && state !== 'in_progress') {
        this.setTimer();
      } else if (state === 'in_progress' && nextState !== 'in_progress') {
        this.clearTimer();
      }
    }
  }

  handleEnd = (): void => {
    if (this.props.id) {
      this.props.onEnd(this.props.id);
    }
  };

  handleAnswer = (): void => {
    if (this.props.id) {
      this.props.onAnswer(this.props.id);
    }
  };

  handleSizeToggle = (): void => {
    if (this.props.id) {
      this.props.onSizeToggle(this.props.id, !this.props.small);
    }
  };

  handleMuteToggle = (): void => {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onMuteToggle(id, !call.isMuted);
    }
  };

  setTimer(): void {
    this.clearTimer();

    let duration = 0;
    this.timer = setInterval(() => {
      this.setState({ duration: ++duration });
    }, 1000);
  }

  clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render(): ?React.Element<any> {
    const { id, call, caller, small } = this.props;
    const { duration } = this.state;

    if (!id || !call || !caller) {
      return null;
    }

    const ChildCall = small ? SmallCall : BigCall;

    return (
      <ChildCall
        call={call}
        caller={caller}
        duration={duration}
        onEnd={this.handleEnd}
        onAnswer={this.handleAnswer}
        onSizeToggle={this.handleSizeToggle}
        onMuteToggle={this.handleMuteToggle}
      />
    );
  }
}

export default Call;
