/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../components/CountryCodeSelector/types';
import getCountries from './getCountries';

function getCountryByPhone(phone: string): ?Country {
  const countries = getCountries();
  const detectedCountry = countries.find((country) => phone.indexOf(country.code.replace(/\s/g, '')) > -1);

  return detectedCountry ? detectedCountry : null;
}

export default getCountryByPhone;
