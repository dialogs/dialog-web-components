/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps } from './types';
import React, { Component } from 'react';
import BigCall from './BigCall';
import SmallCall from './SmallCall';

class Call extends Component {
  props: CallWrapperProps;

  handleEnd: Function;
  handleAnswer: Function;
  handleSizeToggle: Function;
  handleMuteToggle: Function;

  constructor(props: CallWrapperProps) {
    super(props);

    this.handleEnd = this.handleEnd.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSizeToggle = this.handleSizeToggle.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
  }

  shouldComponentUpdate(nextProps: CallWrapperProps) {
    return nextProps.id !== this.props.id ||
           nextProps.call !== this.props.call ||
           nextProps.small !== this.props.small ||
           nextProps.duration !== this.props.duration ||
           nextProps.caller !== this.props.caller ||
           nextProps.className !== this.props.className;
  }

  handleEnd(): void {
    if (this.props.id) {
      this.props.onEnd(this.props.id);
    }
  }

  handleAnswer(): void {
    if (this.props.id) {
      this.props.onAnswer(this.props.id);
    }
  }

  handleSizeToggle(): void {
    if (this.props.id) {
      this.props.onSizeToggle(this.props.id, !this.props.small);
    }
  }

  handleMuteToggle(): void {
    const { id, call } = this.props;
    if (id && call) {
      this.props.onMuteToggle(id, !call.isMuted);
    }
  }

  render(): ?React.Element<any> {
    const { id, call, caller, small, duration } = this.props;
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
