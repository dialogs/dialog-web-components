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
import ogv from 'ogv';

if (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
  ogv.OGVLoader.base = process.resourcesPath + '/ogv';
} else {
  ogv.OGVLoader.base = 'ogv';
}

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
  isEnded: boolean,
  currentTime: number,
  isOgg: boolean
};

class AudioPlayer extends PureComponent<Props, State> {
  audio: ?HTMLMediaElement;
  rewind: ?HTMLElement;
  playerOGV: ?HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      key: String(Math.random()),
      error: null,
      duration: props.duration || 0,
      isPlaying: false,
      isEnded: false,
      currentTime: 0,
      isOgg: true
    };
  }

  handleError = () => {
    const { isOgg } = this.state;
    if (isOgg && this.playerOGV.error) {
      this.setState({
        error: this.playerOGV.error.message,
        isPlaying: false,
        currentTime: 0
      });
    } else {
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
    const { isEnded, isOgg } = this.state;
    if (isEnded && isOgg) {
      this.playerOGV.stop();
    }

    this.setState(() => {
      if (this.playerOGV.error && isOgg) {
        return {
          key: String(Math.random()),
          error: this.playerOGV.error.message,
          isPlaying: false,
          currentTime: 0
        };
      }

      return {
        isPlaying: true,
        isEnded: false
      };
    });

    if (!isOgg && this.audio) {
      this.audio.play();
    }

    if (this.playerOGV) {
      this.playerOGV.play();
    }
  };

  handlePauseClick = () => {
    const { isOgg } = this.state;

    this.setState({
      isPlaying: false
    });
    if (this.playerOGV) {
      this.playerOGV.pause();
    }
    if (isOgg) {
      this.playerOGV.pause();
    } else {
      this.audio.pause();
    }
  };

  handleEnded = () => {
    const { isOgg } = this.state;
    const { duration } = this.props;

    if (isOgg) {
      this.playerOGV.currentTime = duration;
    }

    this.setState({
      isPlaying: false,
      currentTime: duration,
      isEnded: true
    });
  };

  handleRewind = (event: SyntheticMouseEvent<>) => {
    const { isEnded, isOgg } = this.state;
    const { duration } = this.props;

    event.stopPropagation();
    if (!this.rewind && this.state.error) {
      return;
    }

    const rewindRect = this.rewind.getBoundingClientRect();
    const rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;
    if (isOgg) {
      if (isEnded) {
        this.setState({
          isEnded: false
        });
      }
      if (this.playerOGV) {
        this.playerOGV.currentTime = (duration * rewindPosition) / 1000;
        this.setState({
          currentTime: this.playerOGV.currentTime.toFixed(5)
        });
      }
    } else {
      this.audio.currentTime = this.audio.duration * rewindPosition;
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
    if (this.audio && !this.state.isOgg) {
      return parseInt(this.audio.currentTime, 10);
    }

    return 0;
  }

  setAudio = (audio: ?HTMLMediaElement) => {
    const { src } = this.props;
    if (!src) {
      return;
    }

    if (!this.playerOGV) {
      this.playerOGV = new ogv.OGVPlayer();
      this.playerOGV.src = this.props.src;

      this.playerOGV.addEventListener('ended', this.handleEnded);
      this.playerOGV.addEventListener('playing', this.updateCurrentTime);
      this.playerOGV.addEventListener('error', this.handleError);
    }

    let format = src.split('?')[0].split('.');
    format = format[format.length - 1];

    this.setState(() => {
      if (format === 'ogg' || format === 'opus') {
        return {
          isOgg: true
        };
      }

      return {
        isOgg: false
      };
    });

    if ((format !== 'ogg' || format !== 'opus') && audio) {
      this.audio = audio;
    }

    if (audio) {
      audio.volume = 1;
    } else {
      this.playerOGV.volume = 1;
    }
  };

  setRewind = (rewind: ?HTMLElement) => {
    if (rewind) {
      this.rewind = rewind;
    }
  };

  updateCurrentTime = () => {
    const { isPlaying } = this.state;
    const { duration } = this.props;

    const timer = setInterval(() => {
      if (isPlaying) {
        this.setState({
          currentTime: Number(this.playerOGV.currentTime.toFixed(5))
        });
      }
      if (Math.ceil(this.playerOGV.currentTime) >= Math.ceil(duration / 1000) || !isPlaying) {
        clearInterval(timer);
      }
    }, 500);
  };

  ogvPause = () => {
    if (this.playerOGV) {
      this.playerOGV.pause();
    }
  };

  renderPlayPauseButton() {
    const { pending } = this.props;
    const { error, isPlaying } = this.state;

    return (
      <div>
        <AudioPlayerButton
          error={error}
          pending={Boolean(pending)}
          isPlaying={isPlaying}
          onPlay={this.handlePlayClick}
          onPause={this.handlePauseClick}
        />
      </div>
    );
  }

  renderPlayerSeeker() {
    const { currentTime, duration } = this.state;
    const progress = (this.state.currentTime / (duration / 1000)) * 100;
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

    return <div className={styles.state}>{getHumanTime(this.state.duration)}</div>;
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
        {this.state.isOgg ? this.setAudio() : this.renderAudioElement()}
      </div>
    );
  }
}

export default AudioPlayer;
