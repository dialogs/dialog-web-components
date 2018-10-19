/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './PadNumber.css';
import PhoneInput from '../../PhoneInput/PhoneInput';

type Props = {
  className?: string,
  number: string,
  onChange: (number: string) => mixed,
  onFocus: () => mixed,
  onBlur: () => mixed
};

class PadNumber extends PureComponent<Props> {
  input: ?PhoneInput;

  handleChange = (number: string) => {
    this.props.onChange(number);
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <form className={className} name="dialpad-form">
        <PhoneInput
          id="dialpad_phone_input"
          value={this.props.number}
          onChange={this.handleChange}
          className={styles.inputContainer}
          inputClassName={styles.input}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </form>
    );
  }
}

export default PadNumber;
