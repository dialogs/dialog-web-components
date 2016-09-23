/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

function getFilenameExtension(filename: ?string): string {
  if (!filename) {
    return '';
  }

  const idx = filename.lastIndexOf('.');
  if (idx <= 0) {
    return filename;
  }

  return filename.slice(idx - 1);
}

export default getFilenameExtension;
