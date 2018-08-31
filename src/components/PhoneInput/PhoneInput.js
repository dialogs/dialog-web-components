/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Country } from '../CountryCodeSelector/utils/countries';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import getCountryByPhone from './utils/getCountryByPhone';
import normalize from './utils/normalize';
import { getPreferredCountryCodes } from '../../utils/language';

type Props = {
  value: string,
  className?: string,
  inputClassName?: string,
  id: string,
  name?: string,
  label?: string,
  size: 'small' | 'normal',
  placeholder?: string,
  disabled?: boolean,
  hint?: string,
  status?: 'default' | 'success' | 'error',
  autoFocus?: boolean,
  tabIndex?: number,
  preferredCountryCodes: string[],
  onChange: (value: string, country: ?Country) => mixed
};

class PhoneInput extends PureComponent<Props> {
  input: ?InputNext;

  static defaultProps = {
    preferredCountryCodes: getPreferredCountryCodes(),
    size: 'normal'
  };

  handleChange = (value: string): void => {
    const phone = normalize(value) || '+';
    this.props.onChange(
      phone,
      getCountryByPhone(phone, this.props.preferredCountryCodes)
    );
  };

  setInput = (element: *): void => {
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
        value={this.props.value || '+'}
        className={this.props.className}
        inputClassName={this.props.inputClassName}
        id={this.props.id}
        name={this.props.name}
        label={this.props.label}
        size={this.props.size}
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
