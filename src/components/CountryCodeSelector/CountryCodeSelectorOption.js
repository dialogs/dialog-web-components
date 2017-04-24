/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import type { Country } from './types';
import Emoji from '../Emoji/Emoji';
import { Text } from '@dlghq/react-l10n';
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
        <Text className={styles.optionCountry} id={`CountryCodeSelector.country.${country.alpha}`} tagName="div" />
      </div>
      <span className={styles.optionCode}>{country.code}</span>
    </div>
  );
}

export default CountryCodeSelectorOption;
