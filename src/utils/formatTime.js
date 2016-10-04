/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function pad(num: number): string {
  return num < 10 ? '0' + num : String(num);
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);

  return pad(minutes) + ':' + pad(seconds);
}

export default formatTime;
