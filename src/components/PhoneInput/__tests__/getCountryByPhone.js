/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import getCountryByPhone from '../getCountryByPhone';

describe('Detect country by phone number', () => {
  test('+7495 is Russian number', () => {
    expect(getCountryByPhone('+7495', [])).toEqual({
      alpha: 'RU',
      code: '+7',
      flag: '🇷🇺'
    });
  });

  test('+77 is Kazakhstan number', () => {
    expect(getCountryByPhone('+77', [])).toEqual({
      alpha: 'KZ',
      code: '+7 7',
      flag: '🇰🇿'
    });
  });

  test('+1 is Canadian number', () => {
    expect(getCountryByPhone('+1', ['US', 'CA'])).toEqual({
      alpha: 'CA',
      code: '+1',
      flag: '🇨🇦'
    });
  });
});
