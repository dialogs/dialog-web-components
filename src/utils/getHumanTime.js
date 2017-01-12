/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export default function getHumanTime(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = parseInt(((milliseconds % 60000) / 1000).toFixed(0), 10);
  const secondsPrefix = seconds < 10 ? '0' : '';

  return `${minutes}:${secondsPrefix}${seconds}`;
}
