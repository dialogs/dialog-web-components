/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import en from 'date-fns/locale/en';
import ru from 'date-fns/locale/ru';

function getDateFnsLocale(locale: string): Object {
  if (locale === 'ru') {
    return ru;
  }

  return en;
}

export default getDateFnsLocale;
