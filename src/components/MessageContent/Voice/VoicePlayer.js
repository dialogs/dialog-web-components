/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import getHumanTime from '../../../utils/getHumanTime';
import { Text } from '@dlghq/react-l10n';
import VoicePlayerButton from './VoicePlayerButton';
import styles from './Voice.css';

export type VoicePlayerProps = {
  fileUrl: ?string,
  duration: number,
  isUploading: boolean,
  short: boolean
};

export type VoicePlayerState = {
  isPlaying: boolean,
  currentTime: number,
  duration: number
};

class VoicePlayer extends PureComponent {
  props: VoicePlayerProps;
  state: VoicePlayerState;

  audio: ?HTMLMediaElement;
  rewind: ?HTMLElement;
  interval: ?number;

  setAudio: Function;
  setRewind: Function;
  handleTimeUpdate: Function;
  handleLoading: Function;
  handlePlayEnding: Function;
  handlePlayClick: Function;
  handlePauseClick: Function;
  handleRewind: Function;

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
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handlePlayEnding(): void {
    if (this.audio) {
      this.setState({
        isPlaying: false,
        currentTime: this.audio.duration
      });
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleRewind(event: MouseEvent): void {
    if (this.rewind) {
      const rewindRect: ClientRect = this.rewind.getBoundingClientRect();
      const rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

      if (this.audio) {
        this.audio.currentTime = this.audio.duration * rewindPosition;
      }
    }
  }

  handleTimeUpdate(): void {
    if (this.audio) {
      this.setState({ currentTime: this.audio.currentTime });
    }
  }

  setAudio(audio: ?HTMLAudioElement): void {
    if (audio) {
      audio.volume = 1;
    }

    this.audio = audio;
  }

  setRewind(rewind: ?HTMLAudioElement): void {
    this.rewind = rewind;
  }

  renderPlayPauseButton(): React.Element<any> {
    const { isUploading } = this.props;
    const { isPlaying } = this.state;

    return (
      <VoicePlayerButton
        pending={isUploading}
        isPlaying={isPlaying}
        onPlay={this.handlePlayClick}
        onPause={this.handlePauseClick}
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
    const { short } = this.props;
    const { duration } = this.state;

    const total = getHumanTime(duration * 1000);

    return (
      <div className={styles.player}>
        {this.renderPlayPauseButton()}
        <div className={styles.playerControls}>
          {this.renderPlayerSeeker()}
          <div className={styles.playerTime}>
            <Text
              tagName="span"
              className={styles.playerControlsText}
              id={`MessageContent.${short ? 'voice_short' : 'voice'}`}
            />
            {total}
          </div>
        </div>
        {this.renderAudioElement()}
      </div>
    );
  }
}

export default VoicePlayer;
