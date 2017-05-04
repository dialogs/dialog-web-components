/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from './types';
import { noop } from 'lodash';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Emoji from '../Emoji/Emoji';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { getCountryName } from '@dlghq/country-codes';
import styles from './CountryCodeSelector.css';

type Props = {
  style?: Object,
  country: Country,
  isFocused: boolean,
  isSelected: boolean,
  onFocus: (country: Country) => void,
  onSelect: (country: Country) => void
};

class CountryCodeSelectorOption extends PureComponent {
  props: Props;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  static renderOption({ focusedOption, focusOption, key, option, selectValue, style, valueArray }) {
    return (
      <CountryCodeSelectorOption
        key={key}
        style={style}
        country={option}
        isFocused={option === focusedOption}
        isSelected={valueArray.indexOf(option) >= 0}
        onFocus={focusOption}
        onSelect={selectValue}
      />
    );
  }

  static renderValue(country) {
    return (
      <CountryCodeSelectorOption
        country={country}
        isFocused={false}
        isSelected={false}
        onFocus={noop}
        onSelect={noop}
      />
    );
  }

  handleClick = () => {
    this.props.onSelect(this.props.country);
  };

  handleMouseOver = () => {
    this.props.onFocus(this.props.country);
  };

  renderFlag() {
    const { country } = this.props;
    if (country.flag) {
      return (
        <Emoji
          className={styles.optionFlag}
          char={country.flag}
          size={26}
        />
      );
    }

    return null;
  }

  render() {
    const { l10n: { locale } } = this.context;
    const { style, country, isFocused, isSelected } = this.props;

    const className = classNames(
      styles.option,
      isFocused ? styles.optionFocused : null,
      isSelected ? styles.optionSelected : null
    );
    const title = getCountryName(country.alpha, locale);

    return (
      <div
        className={className}
        style={style}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
      >
        {this.renderFlag()}
        <div className={styles.optionLabel}>{title}</div>
        <span className={styles.optionCode}>{country.code}</span>
      </div>
    );
  }
}

export default CountryCodeSelectorOption;
