/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getHumanTime from '../../utils/getHumanTime';
import MediaErrorMessage from '../MediaErrorMessage/MediaErrorMessage';
import AudioPlayerButton from './AudioPlayerButton/AudioPlayerButton';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './AudioPlayer.css';

type Props = {
  src: ?string,
  duration?: ?number,
  pending?: ?boolean,
  sender?: ?string
};

type State = {
  key: string,
  error: ?MediaError,
  duration: number,
  isPlaying: boolean,
  currentTime: number
};

class AudioPlayer extends PureComponent<Props, State> {
  audio: ?HTMLMediaElement;
  rewind: ?HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      key: String(Math.random()),
      error: null,
      duration: props.duration || 0,
      isPlaying: false,
      currentTime: 0
    };
  }

  handleError = () => {
    if (this.audio) {
      const { error } = this.audio;

      this.setState({
        error,
        isPlaying: false,
        currentTime: 0
      });

      console.error(error); // eslint-disable-line
    }
  };

  handleLoadedMetadata = () => {
    const duration = this.getDuration();
    this.setState({ duration });
  };

  handlePlayClick = () => {
    this.setState(() => {
      if (this.audio) {
        if (this.audio.error) {
          return {
            key: String(Math.random()),
            error: null,
            isPlaying: true,
            currentTime: 0
          };
        }

        this.audio.play();
      }

      return { isPlaying: true };
    });
  };

  handlePauseClick = () => {
    if (this.audio) {
      this.audio.pause();
    }
  };

  handleEnded = () => {
    const currentTime = this.getCurrentTime();
    this.setState({ currentTime, isPlaying: false });
  };

  handlePause = () => {
    const currentTime = this.getCurrentTime();
    this.setState({ currentTime, isPlaying: false });
  };

  handleRewind = (event: SyntheticMouseEvent<>) => {
    event.stopPropagation();

    if (this.rewind && !this.state.error) {
      const rewindRect = this.rewind.getBoundingClientRect();
      const rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

      if (this.audio) {
        this.audio.currentTime = this.audio.duration * rewindPosition;
      }
    }
  };

  handleTimeUpdate = () => {
    const currentTime = this.getCurrentTime();
    this.setState({ currentTime });
  };

  getDuration(): number {
    if (this.audio && this.audio.duration > 0) {
      return parseInt(this.audio.duration * 1000, 10);
    }

    return this.props.duration || 0;
  }

  getCurrentTime(): number {
    if (this.audio) {
      return parseInt(this.audio.currentTime * 1000, 10);
    }

    return 0;
  }

  setAudio = (audio: ?HTMLMediaElement) => {
    if (audio) {
      audio.volume = 1;
      if (this.state.isPlaying) {
        audio.play();
      }
    }

    this.audio = audio;
  };

  setRewind = (rewind: ?HTMLElement) => {
    if (rewind) {
      this.rewind = rewind;
    }
  };

  renderPlayPauseButton() {
    const { pending } = this.props;
    const { error, isPlaying } = this.state;

    return (
      <AudioPlayerButton
        error={error}
        pending={Boolean(pending)}
        isPlaying={isPlaying}
        onPlay={this.handlePlayClick}
        onPause={this.handlePauseClick}
      />
    );
  }

  renderPlayerSeeker() {
    const { currentTime, duration } = this.state;
    const progress = currentTime / duration * 100;
    const current = getHumanTime(currentTime);

    const className = classNames(styles.seeker, {
      [styles.seekerError]: this.state.error
    });

    return (
      <div className={className} onClick={this.handleRewind} ref={this.setRewind} title={current}>
        <div className={styles.seekerPlayed} style={{ width: progress + '%' }} />
      </div>
    );
  }

  renderAudioElement() {
    const { src } = this.props;
    const { key } = this.state;

    if (!src) {
      return null;
    }

    return (
      <audio
        key={key}
        ref={this.setAudio}
        src={src}
        onError={this.handleError}
        onEnded={this.handleEnded}
        onPause={this.handlePause}
        onTimeUpdate={this.handleTimeUpdate}
        onLoadedMetadata={this.handleLoadedMetadata}
      />
    );
  }

  renderState() {
    const { error } = this.state;
    if (error) {
      return <MediaErrorMessage className={styles.error} error={error} />;
    }

    return (
      <div className={styles.state}>
        {getHumanTime(this.state.duration)}
      </div>
    );
  }

  renderSender() {
    if (!this.props.sender) {
      return null;
    }

    return (
      <div className={styles.sender}>
        {'\u00A0-\u00A0'}
        <PeerInfoTitle title={this.props.sender || ''} emojiSize={13} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.player}>
        {this.renderPlayPauseButton()}
        <div className={styles.playerControls}>
          {this.renderPlayerSeeker()}
          <div className={styles.playerTime}>
            {this.renderState()}
            {this.renderSender()}
          </div>
        </div>
        {this.renderAudioElement()}
      </div>
    );
  }
}

export default AudioPlayer;
