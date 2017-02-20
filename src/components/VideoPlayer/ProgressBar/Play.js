import React, { PureComponent } from 'react';
import styles from './ProgressBar.css';
import Icon from '../../Icon/Icon';

export type Props = {
  playing?: boolean,
  onPlay?: ( ) => any,
  onPause?: ( ) => any,
};

class Play extends PureComponent {

  static defaultProps = {
    playing: false,
  };

  triggerCallback = (callback, ...args) : any => {
    if(typeof callback === 'function') {
      return callback(...args);
    }
    return null;
  };

  hendleClick = (event) : void => {
    event.preventDefault();
    event.stopPropagation();
    if(!this.props.playing) {
      this.triggerCallback(this.props.onPlay);
    } else {
      this.triggerCallback(this.props.onPause);
    }
  };

  render( ) {
    return (
      <div className={styles.play} onClick={this.hendleClick}>
        {this.props.playing
          ? <Icon
              className={styles.playIcon}
              glyph="pause"
              theme="light"
              size="medium"/>
          : <Icon
            className={styles.playIcon}
            glyph="play"
            theme="light"
            size="medium"/>}
      </div>
    );
  }

}

export default Play;
