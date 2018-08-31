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
  phone: string,
  onChange: (phone: string) => mixed
};

class PadNumber extends PureComponent<Props> {
  input: ?PhoneInput;

  handleChange = (phone: string) => {
    this.props.onChange(phone);
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <form className={className} name="dialpad-form">
        <PhoneInput
          id="dialpad_phone_input"
          value={this.props.phone}
          onChange={this.handleChange}
          className={styles.inputContainer}
          inputClassName={styles.input}
        />
      </form>
    );
  }
}

export default PadNumber;
