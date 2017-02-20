// @flow

import React, { PureComponent } from 'react';
import styles from './VideoPlayer.css';
import classNames from 'classnames';
import { nodeParents } from '../../utils/dom';

// Components for player
import PlayOnPreview from './PlayOnPreview';
import ProgressBar from './ProgressBar/ProgressBar';
// end

export type Props = {
  className?: string,
  autoPlay?: boolean,
  /**
   * Time to start
   */
  currentTime?: number,
  content: {
    width: number,
    height: number,
    duration: number,
    preview: string,
    fileUrl:
      ? string,
    fileName:
      ? string
  }
}

class VideoPlayer extends PureComponent {
  props : Props;
  video : HTMLElement;
  progressBar : HTMLElement;
  timer : number = null; // timer id for video

  constructor( props ) {
    super( props );

    this.state = {
      playing: props.autoPlay,
      currentTime: props.currentTime
    };
  }

  static defaultProps = {
    autoPlay: false,
    currentTime: 0
  };

  componentDidUpdate( prevProps, prevState ) {
    if(this.state.playing) {
        this.startVideo();
        this.stopVideo();
    }
    if ( prevState.playing !== this.state.playing ) {
      if ( this.state.playing ) {
        this
          .video
          .play( );
      } else {
        this
          .video
          .pause( );
      }
    }
  }

  componentWillUnmount() {
    this.stopVideo();
  }

  startVideo = () : void => {
    console.log('start');
    this.timer = setInterval(() => console.log('asd'), 1000);
  }

  tick = () : void => {
    console.log(this.video.currentTime, this.timer);
    this.setState({
      ...this.state,
      currentTime: this.video.currentTime
    });
    if(this.video.ended) {
      this.stopVideo();
    }

  };

  stopVideo = () : boolean => {
    if(typeof this.timer === 'number') {
      clearTimeout(this.timer);
      return true;
    }
    return false;
  }

  setVideo = ( element : HTMLElement ) => {
    this.video = element;
  };

  setProgressBar = ( element :
    ? React.PureComponent ) => {
    this.progressBar = element.progressBar;
  };



  hendleClick = ( event ) => {
    event.preventDefault( );
    event.stopPropagation( );
    const { target } = event;
    if (!nodeParents( target, this.progressBar )) {
      this.togglePlaying( );
    }
  };

  hendlePause = ( ) => {
    this.pause( );
  };

  hendlePlay = ( ) => {
    this.play( );
  };

  togglePlaying( ) {
    this.setState({
      ...this.state,
      playing: !this.state.playing
    });
  }

  pause( ) {
    this.setState({
      ...this.state,
      playing: false
    });
  }

  play( ) {
    this.setState({
      ...this.state,
      playing: true
    });
  }

  render( ) {
    const { autoPlay, content } = this.props;
    const className = classNames(styles.container, {
      [ this.props.className ]: this.props.className
    });

    return (
      <div className={className} onClick={this.hendleClick}>
        <video
          ref={this.setVideo}
          autoPlay={autoPlay}
          poster={content.preview}>
          <source src={content.fileUrl}/>
          Your browres don't support the HTML5 video. Sorry.<br/>
          You can insall more new version for open it.
        </video>
        {!this.state.playing && <PlayOnPreview/>}
        <ProgressBar
          ref={this.setProgressBar}
          playing={this.state.playing}
          onPause={this.hendlePause}
          currentTime={this.state.currentTime}
          onPlay={this.hendlePlay}
          duration={content.duration}/>
      </div>
    );
  }

}

export default VideoPlayer;
