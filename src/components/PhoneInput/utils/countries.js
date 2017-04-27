/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import { getCountries } from '@dlghq/country-codes';

export type Country = {
  code: string,
  flag: ?string,
  alpha: string
};

const countries: Country[] = [];

getCountries().forEach((country) => {
  country.codes.forEach((code) => {
    countries.push({
      code,
      flag: country.emoji,
      alpha: country.alpha
    });
  });
});

export default countries;
