/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentVoice } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import VoicePlayer from './VoicePlayer';
import TransctiptButton from './TranscriptButton';
import VoiceTranscription from './VoiceTranscription';
import styles from './Voice.css';

export type MessageContentVoiceProps = MessageContentVoice & {
  className?: string,
  transcription: ?string,
  getTranscription?: () => void,
  isTranscriptionEnabled: boolean,
};

export type MessageContentVoiceState = {
  isTranscriptionVisible: boolean
};

class Voice extends Component {
  props: MessageContentVoiceProps;
  state: MessageContentVoiceState;

  handleToggleTranscription: () => void;

  static defaultProps = {
    isTranscriptionEnabled: false
  };

  constructor(props: MessageContentVoiceProps) {
    super(props);

    this.state = {
      isTranscriptionVisible: false
    };

    this.handleToggleTranscription = this.handleToggleTranscription.bind(this);
  }

  shouldComponentUpdate(nextProps: MessageContentVoiceProps, nextState: MessageContentVoiceState) {
    return nextState.isTranscriptionVisible !== this.state.isTranscriptionVisible ||
           nextProps.className !== this.props.className ||
           nextProps.transcription !== this.props.transcription ||
           nextProps.isTranscriptionEnabled !== this.props.isTranscriptionEnabled;
  }

  handleToggleTranscription() : void {
    const { transcription, getTranscription } = this.props;
    const { isTranscriptionVisible } = this.state;

    if (getTranscription && !transcription) {
      getTranscription();
    }

    this.setState({ isTranscriptionVisible: !isTranscriptionVisible });
  }

  renderTrancsriptButton() {
    const { isTranscriptionEnabled } = this.props;
    const { isTranscriptionVisible } = this.state;

    if (!isTranscriptionEnabled) {
      return null;
    }

    const className = classNames(styles.transctiptButton, {
      [styles.transctiptButtonActive]: isTranscriptionVisible
    });

    return (
      <TransctiptButton
        onClick={this.handleToggleTranscription}
        className={className}
      />
    );
  }

  renderMessage() {
    const { duration, fileUrl } = this.props;

    return (
      <div className={styles.container}>
        <VoicePlayer
          duration={duration}
          fileUrl={fileUrl}
        />
        {this.renderTrancsriptButton()}
      </div>
    );
  }

  renderTranscription() {
    const { transcription } = this.props;
    const { isTranscriptionVisible } = this.state;

    if (!isTranscriptionVisible) {
      return null;
    }

    return (
      <VoiceTranscription transcription={transcription} />
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderMessage()}
        {this.renderTranscription()}
      </div>
    );
  }
}

export default Voice;
