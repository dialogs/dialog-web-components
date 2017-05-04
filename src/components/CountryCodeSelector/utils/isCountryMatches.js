/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../types';
import { getCountryNamesArray } from '@dlghq/country-codes';
import { memoize } from 'lodash';

const normalize = memoize((text: string) => {
  return text.toLowerCase().replace(/\s/g, '').replace(/ё/g, 'е');
});

export function isCountryMatches(country: Country, query: string): boolean {
  const normalizedQuery = normalize(query);

  const codeContains = normalize(country.code).includes(normalizedQuery);

  if (codeContains) {
    return true;
  }

  const nameContains = getCountryNamesArray(country.alpha).some((name) => {
    return normalize(name).includes(normalizedQuery);
  });

  return nameContains;
}
