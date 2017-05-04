/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import VirtualizedSelect from 'react-virtualized-select';
import styles from './CountryCodeSelector.css';
import CountryCodeSelectorOption from './CountryCodeSelectorOption';
import countries from './utils/countries';
import { getPreferredCountryCode } from '../../utils/language';
import { isCountryMatches } from './utils/isCountryMatches';

class CountryCodeSelector extends PureComponent {
  props: Props;
  select: ?VirtualizedSelect;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  static defaultProps = {
    countries
  };

  componentWillMount() {
    const preferredCountryCode = getPreferredCountryCode();
    if (preferredCountryCode) {
      const currentCountry = this.props.countries.find((country) => country.alpha === preferredCountryCode);
      if (currentCountry) {
        this.props.onChange(currentCountry);
      }
    }
  }

  handleLabelClick = () => {
    if (this.select) {
      this.select.focus();
    }
  };

  setSelect = (select: VirtualizedSelect) => {
    this.select = select;
  };

  renderLabel(): ?React.Element<any> {
    const { label } = this.props;

    if (!label) {
      return null;
    }

    return (
      <Text className={styles.label} id={label} onClick={this.handleLabelClick} />
    );
  }

  render(): React.Element<any> {
    const { l10n } = this.context;
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.disabled ? styles.disabled : null
    );

    return (
      <div className={className}>
        {this.renderLabel()}
        <VirtualizedSelect
          ref={this.setSelect}
          name="country-code"
          value={this.props.value}
          clearable={false}
          optionHeight={37}
          options={this.props.countries}
          placeholder={l10n.formatText('CountryCodeSelector.search')}
          noResultsText={l10n.formatText('CountryCodeSelector.not_found')}
          disabled={this.props.disabled}
          valueRenderer={CountryCodeSelectorOption.renderValue}
          optionRenderer={CountryCodeSelectorOption.renderOption}
          filterOption={isCountryMatches}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default CountryCodeSelector;
