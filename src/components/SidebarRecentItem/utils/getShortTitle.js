/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

function getShortTitle(title: string): string {
  const space = title.indexOf(' ');
  if (space > 0) {
    return title.slice(0, space);
  }

  return title;
}

export default getShortTitle;
