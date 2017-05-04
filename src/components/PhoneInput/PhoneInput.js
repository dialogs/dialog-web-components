/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../CountryCodeSelector/utils/countries';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import getCountryByPhone from './utils/getCountryByPhone';
import { getPreferredCountryCodes } from '../../utils/language';

type Props = {
  value: string,
  className?: string,
  id: string,
  name?: string,
  label?: string,
  large?: boolean,
  placeholder?: string,
  disabled?: boolean,
  hint?: string,
  status?: 'normal' | 'success' | 'error',
  autoFocus?: boolean,
  tabIndex?: number,
  preferredCountryCodes: string[],
  onChange: (value: string, country: ?Country) => any
};

class PhoneInput extends PureComponent {
  props: Props;
  input: ?InputNext;

  static defaultProps = {
    preferredCountryCodes: getPreferredCountryCodes()
  };

  handleChange = (value: string): void => {
    this.props.onChange(
      value || '+',
      getCountryByPhone(value, this.props.preferredCountryCodes)
    );
  };

  setInput = (element: InputNext): void => {
    this.input = element;
  };

  focus(): void {
    if (this.input && document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  render() {
    return (
      <InputNext
        type="tel"
        value={this.props.value}
        className={this.props.className}
        id={this.props.id}
        name={this.props.name}
        label={this.props.label}
        large={this.props.large}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        hint={this.props.hint}
        status={this.props.status}
        autoFocus={this.props.autoFocus}
        tabIndex={this.props.tabIndex}
        onChange={this.handleChange}
        ref={this.setInput}
      />
    );
  }
}

export default PhoneInput;
