/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import type { Country } from './types';
import Emoji from '../Emoji/Emoji';
import styles from './CountryCodeSelector.css';

function CountryCodeSelectorOption(country: Country): React.Element<any> {
  return (
    <div className={styles.option}>
      {
        country.flag
          ? <Emoji char={country.flag} className={styles.optionFlag} size={26} />
          : null
      }
      <div className={styles.optionLabel}>
        <div className={styles.optionCountry}>{country.label}</div>
      </div>
      <span className={styles.optionCode}>{country.code}</span>
    </div>
  );
}

export default CountryCodeSelectorOption;
