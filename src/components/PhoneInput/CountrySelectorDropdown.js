/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from './PhoneInput';
import React, { PureComponent } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import CountrySelectorDropdownItem from './CountrySelectorDropdownItem';
import styles from './PhoneInput.css';
import countryCodes from '@dlghq/country-codes';

export type Props = {
  onSelect: (country: Country) => void
};

class CountrySelectorDropdown extends PureComponent {
  props: Props;

  renderCountryList() {
    const countries = [];

    countryCodes.forEach((country) => {
      country.codes.forEach((code) => {
        countries.push(
          <CountrySelectorDropdownItem
            key={`${country.alpha2}-${code}`}
            onClick={this.props.onSelect}
            country={{
              alpha2: country.alpha2,
              code,
              flag: country.emoji
            }}
          />
        );
      });
    });

    return countries;
  }

  render(): React.Element<any> {
    return (
      <Dropdown className={styles.selectorDropdown}>
        <div className={styles.selectorDropdownWrapper}>
          {this.renderCountryList()}
        </div>
      </Dropdown>
    );
  }
}

export default CountrySelectorDropdown;
