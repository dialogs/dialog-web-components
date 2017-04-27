/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../CountryCodeSelector/types';
import countries from '../../utils/getCountries';

function getCountryByPhone(phone: string, languages: string[]): ?Country {
  const variants = countries.filter((country) => {
    return phone.startsWith(country.code.replace(/\s/g, ''));
  });

  if (!variants.length) {
    return null;
  }

  variants.sort((a, b) => {
    const lengthDiff = b.code.replace(/\s/g, '').length - a.code.replace(/\s/g, '').length;

    if (lengthDiff === 0) {
      return languages.indexOf(b.alpha) - languages.indexOf(a.alpha);
    }

    return lengthDiff;
  });

  return variants[0];
}

export default getCountryByPhone;
