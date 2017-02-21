/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from './PhoneInput';
import React, { PureComponent } from 'react';
import DropdownItem from '../Dropdown/DropdownItem';
import Emoji from '../Emoji/Emoji';
import { Text } from '@dlghq/react-l10n';
import styles from './PhoneInput.css';

export type Props = {
  country: Country,
  onClick: (country: Country) => void
};

class CountrySelectorDropdownItem extends PureComponent {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.country);
  };

  render(): React.Element<any> {
    const { country } = this.props;

    return (
      <DropdownItem onClick={this.handleClick} className={styles.selectorDropdownItem}>
        <Emoji char={country.flag} />
        <Text id={`PhoneInput.country.${country.alpha2}`} />
        {country.code}
      </DropdownItem>
    );
  }
}

export default CountrySelectorDropdownItem;
