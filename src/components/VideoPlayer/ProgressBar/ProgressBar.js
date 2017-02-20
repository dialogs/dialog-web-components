import React from 'react';
import styles from './ProgressBar.css';
import classNames from 'classnames';

// Bar Components
import Play from './Play';
import Sound from './Sound';
import Duration from './Duration';
import DurationBar from './DurationBar';
// end

export type Props = {
  className?: string,
  playing?: boolean,
  duration: number,
  onPlay: ( ) => any,
  onPause: ( ) => any
}

class ProgressBar extends React.Component {
  props : Props;
  progressBar : HTMLElement;

  constructor( props ) {
    super( props );

    this.state = {
      hovered: false
    };
  }

  static defaultProps = {
    playing: false
  };

  hendleMauseEnter = ( ) => {
    this.setState({
      ...this.state,
      hovered: true
    });
  }

  hendleMouseLeave = ( ) => {
    this.setState({
      ...this.state,
      hovered: false
    });
  }

  setProgressBar = ( element : HTMLElement ) => {
    this.progressBar = element;
  }

  render( ) {
    const className = classNames(styles.container, {
      [ this.props.className ]: this.props.className,
      [ styles.hovered ]: this.state.hovered,
    });

    return (
      <div
        className={className}
        ref={this.setProgressBar}
        onMouseEnter={this.hendleMauseEnter}
        onMouseLeave={this.hendleMouseLeave}>
        <DurationBar
          duration={this.props.duration}
          value={this.props.currentTime}
          hovered={this.state.hovered}
          playing={this.props.playing}/>
        <div className={styles.left}>
          <Play
            playing={this.props.playing}
            onPause={this.props.onPause}
            onPlay={this.props.onPlay}/>
          <Sound/>
          <Duration value={this.props.duration}/>
        </div>
      </div>
    );
  }

}

export default ProgressBar;
