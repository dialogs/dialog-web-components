/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import getHumanTime from '../../../utils/getHumanTime';
import { Text } from '@dlghq/react-l10n';
import Icon from '../../Icon/Icon';
import styles from './Voice.css';

export type VoicePlayerProps = {
  fileUrl: ?string,
  duration: number
};

export type VoicePlayerState = {
  isPlaying: boolean,
  currentTime: number,
  duration: number
};

class VoicePlayer extends Component {
  props: VoicePlayerProps;
  state: VoicePlayerState;

  audio: HTMLMediaElement;
  rewind: HTMLElement;
  interval: number;
  setAudio: Function;
  setRewind: Function;
  handleTimeUpdate: Function;
  handleLoading: EventHandler;
  handlePlayEnding: EventHandler;
  handlePlayClick: EventHandler;
  handlePauseClick: EventHandler;
  handleRewind: EventHandler;

  constructor(props: VoicePlayerProps) {
    super(props);

    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: props.duration / 1000
    };

    this.setAudio = this.setAudio.bind(this);
    this.setRewind = this.setRewind.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handlePlayEnding = this.handlePlayEnding.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleRewind = this.handleRewind.bind(this);
  }

  shouldComponentUpdate(nextProps: VoicePlayerProps, nextState: VoicePlayerState): boolean {
    return nextState.isPlaying !== this.state.isPlaying ||
           nextState.currentTime !== this.state.currentTime ||
           nextState.duration !== this.state.duration ||
           nextProps.fileUrl !== this.props.fileUrl ||
           nextProps.duration !== this.props.duration;
  }

  handleLoading(): void {
    if (this.audio) {
      this.setState({ duration: this.audio.duration });
    }
  }

  handlePlayClick(): void {
    this.audio.play();
    this.setState({ isPlaying: true });
    this.interval = setInterval(() => {
      this.handleTimeUpdate();
    }, 100);
  }

  handlePauseClick(): void {
    this.audio.pause();
    this.setState({ isPlaying: false });
    clearInterval(this.interval);
  }

  handlePlayEnding(): void {
    this.setState({
      isPlaying: false,
      currentTime: this.audio.duration
    });
    clearInterval(this.interval);
  }

  handleRewind(event: MouseEvent): void {
    const rewindRect: ClientRect = this.rewind.getBoundingClientRect();
    const rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

    this.audio.currentTime = this.audio.duration * rewindPosition;
  }

  handleTimeUpdate(): void {
    this.setState({ currentTime: this.audio.currentTime });
  }

  setAudio(element: HTMLAudioElement): void {
    element.volume = 1;
    this.audio = element;
  }

  setRewind(element: HTMLAudioElement): void {
    this.rewind = element;
  }

  renderPlayPauseButton(): React.Element<any> {
    const { isPlaying } = this.state;

    if (isPlaying) {
      return (
        <Icon
          glyph="pause"
          className={styles.playerIcon}
          theme="primary"
          size="large"
          inverted
          onClick={this.handlePauseClick}
        />
      );
    }

    return (
      <Icon
        glyph="play_arrow"
        className={styles.playerIcon}
        theme="primary"
        size="large"
        inverted
        onClick={this.handlePlayClick}
      />
    );
  }

  renderPlayerSeeker(): React.Element<any> {
    const { currentTime, duration } = this.state;
    const progress = (currentTime / duration) * 100;
    const current = getHumanTime(currentTime * 1000);

    return (
      <div
        className={styles.seeker}
        onClick={this.handleRewind}
        ref={this.setRewind}
        title={current}
      >
        <div className={styles.seekerPlayed} style={{ width: progress + '%' }} />
      </div>
    );
  }

  renderAudioElement(): ?React.Element<any> {
    const { fileUrl } = this.props;

    if (!fileUrl) {
      return null;
    }

    return (
      <audio
        ref={this.setAudio}
        src={fileUrl}
        onLoadedData={this.handleLoading}
        onEnded={this.handlePlayEnding}
        onTimeUpdate={this.handleTimeUpdate}
      />
    );
  }

  render(): React.Element<any> {
    const { duration } = this.state;

    const total = getHumanTime(duration * 1000);

    return (
      <div className={styles.player}>
        {this.renderPlayPauseButton()}
        <div className={styles.playerControls}>
          {this.renderPlayerSeeker()}
          <div className={styles.playerTime}>
            <Text tagName="span" className={styles.playerControlsText} id="MessageContent.voice" />
            {total}
          </div>
        </div>
        {this.renderAudioElement()}
      </div>
    );
  }
}

export default VoicePlayer;
