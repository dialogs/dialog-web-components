/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

function getLocalDateTimeFormat(locale: string): string {
  if (locale === 'ru') {
    return 'DD.MM.YYYY HH:mm';
  }

  return 'MMMM D, YYYY, h:mm A';
}

export default getLocalDateTimeFormat;
