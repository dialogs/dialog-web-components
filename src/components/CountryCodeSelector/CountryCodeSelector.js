/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props, Country, Context } from './types';
import { LocalizationContextType, Text } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import styles from './CountryCodeSelector.css';
import CountryCodeSelectorOption from './CountryCodeSelectorOption';
import { getCountries } from '@dlghq/country-codes';

class CountryCodeSelector extends PureComponent {
  props: Props;
  countries: Country[];

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.countries = [];

    getCountries().forEach((country) => {
      country.codes.forEach((code) => {
        this.countries.push({
          alpha: country.alpha,
          code,
          label: `CountryCodeSelector.country.${country.alpha}`,
          flag: country.emoji
        });
      });
    });
  }

  componentWillMount() {
    const currentCountry = this.countries.find((country) => country.alpha === navigator.language.split('-')[1]);
    if (currentCountry) {
      this.props.onChange(currentCountry);
    }
  }

  renderLabel(): ?React.Element<any> {
    const { label } = this.props;

    if (!label) {
      return null;
    }

    return (
      <Text className={styles.label} id={label} />
    );
  }

  renderOption = (country: Country): React.Element<any> => {
    return (
      <CountryCodeSelectorOption {...country} />
    );
  };

  render(): React.Element<any> {
    const { disabled } = this.props;
    const { l10n: { formatText } } = this.context;
    const className = classNames(styles.container, disabled ? styles.disabled : null, this.props.className);

    return (
      <div className={className}>
        {this.renderLabel()}
        <Select
          name="country-code"
          value={this.props.value}
          clearable={false}
          options={this.countries}
          placeholder={formatText('CountryCodeSelector.search')}
          noResultsText={formatText('CountryCodeSelector.not_found')}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderOption}
        />
      </div>
    );
  }
}

export default CountryCodeSelector;
