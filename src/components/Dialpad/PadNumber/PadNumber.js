/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './PadNumber.css';
import PhoneInput from '../../PhoneInput/PhoneInput';

export type Props = {
  className?: string,
  dialNumber?: string,
  onInputChange?: ()=> mixed
};

class PadNumber extends PureComponent<Props> {

  render() {
    const className = classNames(styles.container, this.props.className);
    const { dialNumber, onInputChange } = this.props;

    if(onInputChange) {
      return (
        <form className={className} name='dialpad-form'>
          <PhoneInput
            onChange={onInputChange}
            value={dialNumber ? dialNumber : ''}
            id='dialpad_phone_input'
          />
        </form>
      );
    }
  }
}

export default PadNumber;
