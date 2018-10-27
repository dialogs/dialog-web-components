/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Timer from './Timer';

type Props = {
  start: number,
  className?: string
};

function pad(value: number) {
  return value < 10 ? '0' + value : value;
}

function formatTime(time: number): string {
  const _time = Math.round(time / 1000);
  const minutes = Math.floor(_time / 60);
  const seconds = _time % 60;

  return pad(minutes) + ':' + pad(seconds);
}

class TimeTimer extends PureComponent<Props> {
  renderTime = (time: number) => {
    const { className } = this.props;

    return (
      <span className={className}>
        {formatTime(time)}
      </span>
    );
  };

  render() {
    const { start } = this.props;

    return <Timer start={start} renderTime={this.renderTime} />;
  }
}

export default TimeTimer;
