import React from 'react';
import styles from './ProgressBar.css';
import classNames from 'classnames';
import PointBar from './PointBar';

export type Props = {
  playing?: boolean,
  className?: string,
  duration: number,
  hovered: boolean
}

class ProgressBar extends React.Component {
  props : Props;
  progressBar : HTMLElement;

  static defaultProps = {
    playing: false,
    hovered: false,
    value: 0
  };

  setProgressBar = ( element : HTMLElement ) => {
    this.progressBar = element;
  }

  getWidth( ) {
    const { value, duration } = this.props;
    let percent = ( value / duration ) * 100;
    if ( percent > 100 ) {
      percent = 100;
    } else if (percent < 0) {
      percent = 0;
    }
    return `${ percent }%`;
  }

  render( ) {
    const className = classNames(styles.durationBar, {
      [ this.props.className ]: this.props.className,
      [ styles.durationBarHovered ]: this.props.hovered
    });

    return (
      <div className={className}>
        <PointBar display={this.props.hovered}/>
        <div
          className={styles.durationBarLine}
          style={{width: this.getWidth( )}}></div>
      </div>
    );
  }

}

export default ProgressBar;
