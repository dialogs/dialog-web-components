/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../components/CountryCodeSelector/types';
import { getCountries as getCountriesFromLib } from '@dlghq/country-codes';

function getCountries(): Country[] {
  const countries = [];

  getCountriesFromLib().forEach((country) => {
    country.codes.forEach((code) => {
      countries.push({
        alpha: country.alpha,
        code,
        flag: country.emoji
      });
    });
  });

  return countries;
}


export default getCountries;
