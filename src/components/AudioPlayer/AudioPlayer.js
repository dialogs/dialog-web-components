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
import Recorder from 'opus-recorder';

type Props = {
  src: ?string,
  duration?: ?number,
  pending?: ?boolean,
  sender?: ?string,
};

type State = {
  key: string,
  error: ?MediaError,
  duration: number,
  isPlaying: boolean,
  currentTime: number,
  decodedSrc: string,
  isDecoded: boolean,
};

const options = {
  sampleRate: 48000,
  wavBitDepth: 32,
  decoderWorkerPath: '/devapp/decoderWorker.min.js',
  wavWorkerPath: '/devapp/waveWorker.min.js'
};

class AudioPlayer extends PureComponent<Props, State> {
  audio: ?HTMLMediaElement;
  rewind: ?HTMLElement;
  decodeWorker: Worker;
  wavWorker: Worker;

  constructor(props: Props) {
    super(props);

    this.state = {
      key: String(Math.random()),
      error: null,
      duration: props.duration || 0,
      isPlaying: false,
      currentTime: 0,
      decodedSrc: '',
      isDecoded: false
    };
  }

  handleError = () => {
    if (this.audio) {
      const { error } = this.audio;

      this.setState({
        error,
        isPlaying: false,
        currentTime: 0,
      });

      console.error(error); // eslint-disable-line
    }
  };

  componentWillMount() {
    const { src } = this.props;

    if(!src){
      return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = (e) => {
      this.decodeAudio(xhr.response);
    };
    xhr.send();
  }

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
            currentTime: 0,
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
      const rewindPosition =
        (event.clientX - rewindRect.left) / rewindRect.width;

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
    const { error, isPlaying, isDecoded } = this.state;

    return (
      <AudioPlayerButton
        error={error}
        pending={Boolean(pending) || !Boolean(isDecoded)}
        isPlaying={isPlaying}
        onPlay={this.handlePlayClick}
        onPause={this.handlePauseClick}
      />
    );
  }

  renderPlayerSeeker() {
    const { currentTime, duration } = this.state;
    const progress = (currentTime / duration) * 100;
    const current = getHumanTime(currentTime);

    const className = classNames(styles.seeker, {
      [styles.seekerError]: this.state.error,
    });

    return (
      <div
        className={className}
        onClick={this.handleRewind}
        ref={this.setRewind}
        title={current}
      >
        <div
          className={styles.seekerPlayed}
          style={{ width: progress + '%' }}
        />
      </div>
    );
  }

  decodeAudio = (buffer) => {
    const typedArray = new Uint8Array(buffer);

    this.decoderWorker = new Worker(options.decoderWorkerPath);
    this.wavWorker = new Worker(options.wavWorkerPath);

    this.decoderWorker.postMessage({
      command:'init',
      decoderSampleRate: options.sampleRate,
      outputBufferSampleRate: options.sampleRate
    });

    this.wavWorker.postMessage({
      command:'init',
      wavBitDepth: options.wavBitDepth,
      wavSampleRate: options.sampleRate
    });

    this.decoderWorker.onmessage = this.decodeWorkerMessage;
    this.wavWorker.onmessage = this.wavWorkerMessage;

    this.decoderWorker.postMessage({
      command: 'decode',
      pages: typedArray
    }, [typedArray.buffer] );
  }

  decodeWorkerMessage = (e) => {
    if (e.data === null) {
      this.wavWorker.postMessage({ command: 'done' });
    } else {
      this.wavWorker.postMessage({
        command: 'encode',
        buffers: e.data
      }, e.data.map(function(typedArray){
        return typedArray.buffer;
      }));
    }
  }

  wavWorkerMessage = (e) => {
    if (e.data !== null) {
      var dataBlob = new Blob( [ e.data ], { type: "audio/wav" } );
      var url = URL.createObjectURL( dataBlob );

      this.setState({ decodedSrc: url, isDecoded: true });
    }
  }

  renderAudioElement() {
    const { key, decodedSrc } = this.state;

    if (!decodedSrc) {
      return null;
    }

    return (
      <audio
        key={key}
        ref={this.setAudio}
        src={decodedSrc}
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
      <div className={styles.state}>{getHumanTime(this.state.duration)}</div>
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
