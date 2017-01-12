/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

function getFilenameExtension(filename: string): string {
  const idx = filename.lastIndexOf('.');
  if (idx <= 0) {
    return filename;
  }

  return filename.slice(idx + 1);
}

export default getFilenameExtension;
