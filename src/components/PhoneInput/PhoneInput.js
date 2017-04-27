/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import getCountryByPhone from './getCountryByPhone';

class PhoneInput extends PureComponent {
  props: Props;
  input: ?HTMLInputElement;
  languages: string[];

  constructor(props: Props) {
    super(props);

    this.languages = navigator.languages.map((lang) => {
      if (lang.length === 2) {
        return lang.toUpperCase();
      }

      return lang.slice(3).toUpperCase();
    });
  }

  handleChange = (value: string): void => {
    const country = getCountryByPhone(value, this.languages);
    this.props.onChange(value, country);
  };

  setInput = (element: HTMLInputElement): void => {
    this.input = element;
  };

  focus(): void {
    if (this.input && document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  render(): React.Element<any> {
    return (
      <InputNext
        {...this.props}
        type="tel"
        onChange={this.handleChange}
        ref={this.setInput}
      />
    );
  }
}

export default PhoneInput;
