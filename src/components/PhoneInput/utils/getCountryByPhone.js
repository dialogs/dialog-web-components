/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from './countries';
import countries from './countries';

function normalize(code: string): string {
  return code.replace(/\s/g, '');
}

function getCountryByPhone(phone: string, languages: string[]): ?Country {
  const variants = countries.filter((country) => {
    return phone.startsWith(normalize(country.code));
  });

  if (!variants.length) {
    return null;
  }

  variants.sort((a, b) => {
    const lengthDiff = normalize(b.code).length - normalize(a.code).length;

    if (lengthDiff === 0) {
      return languages.indexOf(b.alpha) - languages.indexOf(a.alpha);
    }

    return lengthDiff;
  });

  return variants[0];
}

export default getCountryByPhone;
