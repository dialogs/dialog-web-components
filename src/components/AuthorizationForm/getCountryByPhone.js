/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../CountryCodeSelector/types';
import { getCountries } from '@dlghq/country-codes';

const countries = [];

getCountries().forEach((country) => {
  country.codes.forEach((code) => {
    countries.push({
      alpha: country.alpha,
      code,
      label: `CountryCodeSelector.country.${country.alpha}`,
      flag: country.emoji
    });
  });
});

function getCountryByPhone(phone: string): ?Country {
  return countries.find((country) => country.code.replace(/\s/g, '') === phone);
}

export default getCountryByPhone;
