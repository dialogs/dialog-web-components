/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

export default function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
