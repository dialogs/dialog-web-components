/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import { getCountries } from '@dlghq/country-codes';

const countries = [];

getCountries().forEach((country) => {
  country.codes.forEach((code) => {
    countries.push({
      alpha: country.alpha,
      code,
      flag: country.emoji
    });
  });
});

export default countries;
