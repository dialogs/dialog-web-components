import React, { PureComponent } from 'react';
import styles from './ProgressBar.css';

export type Props = {
  // onClick?: ( ) => any
  value: number
};

function toTwoChars(num : number | string) {
  if (num.toString().length < 2) {
    return `0${num}`;
  }
  return num;
}

function getDuration(duration : number) : String {
  let seconds = Math.round(duration / 1000);
  let minutes = Math.round(seconds / 60);
  let hours = Math.round(minutes / 60);

  seconds -= minutes * 60;
  seconds = toTwoChars(seconds < 0 ? 0 : seconds);
  minutes -= hours * 60;
  minutes = toTwoChars(minutes < 0 ? 0 : minutes);

  if (hours < 1) {
    return `${minutes}:${seconds}`;
  }

  hours = toTwoChars(hours);

  return `${hours}:${minutes}:${seconds}`;
}

class Duration extends PureComponent {
  props: Props;

  render( ) {
    const {value} = this.props;
    return (
      <div className={styles.duration}>
        00:00/{getDuration(value)}
      </div>
    );
  }

}

export default Duration;
