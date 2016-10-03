/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component } from 'react';
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

  audio: ?HTMLAudioElement;
  rewind: ?HTMLAudioElement;
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
    if (this.audio) {
      this.audio.play();
      this.setState({ isPlaying: true });
      this.interval = setInterval(() => {
        this.handleTimeUpdate();
      }, 100);
    }
  }

  handlePauseClick(): void {
    if (this.audio) {
      this.audio.pause();
      this.setState({ isPlaying: false });
      clearInterval(this.interval);
    }
  }

  handlePlayEnding(): void {
    if (this.audio) {
      this.setState({
        isPlaying: false,
        currentTime: this.audio.duration
      });
      clearInterval(this.interval);
    }
  }

  handleRewind(event: Event): void {
    const rewindRect = this.rewind.getBoundingClientRect();
    const rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

    if (this.audio) {
      this.audio.currentTime = this.audio.duration * rewindPosition;
    }
  }

  handleTimeUpdate(): void {
    if (this.audio) {
      this.setState({ currentTime: this.audio.currentTime });
    }
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

    return (
      <div className={styles.seeker} onClick={this.handleRewind} ref={this.setRewind}>
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
    return (
      <div className={styles.player}>
        {this.renderPlayPauseButton()}
        {this.renderPlayerSeeker()}
        {this.renderAudioElement()}
      </div>
    );
  }
}

export default VoicePlayer;
