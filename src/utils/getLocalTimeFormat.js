/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

function getLocalTimeFormat(locale: string): string {
  if (locale === 'ru') {
    return 'HH:mm';
  }

  return 'h:mm A';
}

export default getLocalTimeFormat;
