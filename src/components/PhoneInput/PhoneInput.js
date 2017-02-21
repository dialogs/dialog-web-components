/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import countryCodes from '@dlghq/country-codes';
import styles from './PhoneInput.css';
import Input from '../Input/Input';
import { parse, isValidNumber, format, asYouType } from 'libphonenumber-js';

function getGeoData() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.addEventListener('readystatechange', () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else {
          reject(new Error());
        }
      }
    });

    xhttp.open('GET', `${location.protocol}//freegeoip.net/json/`, true);
    xhttp.send();
  });
}

export type Props = {
  className?: string
};

class PhoneInput extends PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      countryCode: '',
      value: '',
      valid: false
    };
  }

  componentDidMount() {
    getGeoData().then((result) => {
      this.setState({ countryCode: result.country_code });
    });
  }

  handleCountryChange = ({ target: { value } }): void => {
    this.setState({ countryCode: value });
  };

  handleNumberChange = (value: String): void => {
    const formatter = new asYouType(this.state.countryCode);
    value = formatter.input(value);
    console.log(formatter)
    // console.log(value)
    // console.debug(parse(value, this.state.countryCode));
    // console.debug(isValidNumber(value, this.state.countryCode));
    // console.debug(format(parse(value, this.state.countryCode), 'International_plaintext'));
    this.setState({
      value,
      valid: formatter.valid
    });
  };

  renderSelect(): React.Element<any> {
    const options = [];

    countryCodes.forEach((country) => {
      country.codes.forEach((code) => {
        options.push(
          <option key={`${country.alpha2}-${code}`} value={country.alpha2}>{country.emoji} {code}</option>
        );
      });
    });

    return (
      <select onChange={this.handleCountryChange} value={this.state.countryCode}>
        <option value="" />
        {options}
      </select>
    );
  }

  renderInput(): React.Element<any> {
    return (
      <Input
        type="tel"
        id="phone"
        name="phone"
        status={this.state.valid ? 'success' : 'normal'}
        onChange={this.handleNumberChange}
        value={this.state.value}
      />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderSelect()}
        {this.renderInput()}
      </div>
    );
  }
}

export default PhoneInput;
