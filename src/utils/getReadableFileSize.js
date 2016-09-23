/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

const thresh = 1024;
const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function getReadableFileSize(bytes: number): string {
  if (bytes < thresh) {
    return bytes + ' B';
  }

  const exp = Math.min(
    units.length,
    Math.floor(
      Math.log(bytes) / Math.log(thresh)
    )
  );

  const result = bytes / Math.pow(2, exp * 10);

  return result.toFixed(1) + ' ' + units[exp - 1];
}

export default getReadableFileSize;
