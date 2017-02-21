/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './PhoneInput.css';
import Input from '../Input/Input';
import CountrySelector from './CountrySelector';

export type Country = {
  alpha2: string,
  code: string,
  flag: string
}

export type Status = 'normal' | 'success' | 'error';

export type Props = {
  className?: string,
  country: Country,
  status: Status,
  value: string,
  onCountryChange: (country: Country) => void,
  onChange: (phone: string) => void
};

class PhoneInput extends PureComponent {
  props: Props;

  renderSelector(): React.Element<any> {
    return (
      <CountrySelector
        country={this.props.country}
        onCountryChange={this.props.onCountryChange}
      />
    );
  }

  renderInput(): React.Element<any> {
    return (
      <Input
        type="tel"
        id="phone"
        name="phone"
        autoFocus
        status={this.props.status}
        value={this.props.value}
        onChange={this.props.onChange}
        className={styles.input}
        wrapperClassName={styles.inputWrapper}
      />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderSelector()}
        {this.renderInput()}
      </div>
    );
  }
}

export default PhoneInput;
