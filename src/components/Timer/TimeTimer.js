/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import Timer from './Timer';

type Props = {
  start: number
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

function renderTime(time: number) {
  return (
    <span>{formatTime(time)}</span>
  );
}

function TimeTimer(props: Props) {
  return (
    <Timer start={props.start} renderTime={renderTime} />
  );
}

export default TimeTimer;
