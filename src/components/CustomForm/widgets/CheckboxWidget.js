/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Switcher from '../../Switcher/Switcher';
import styles from '../CustomForm.css';

type Props = {
  id: string,
  label?: ?string,
  value: boolean,
  rawErrors?: string[],
  options: { [key: string]: * },
  required: boolean,
  disabled: boolean,
  onChange: (value: mixed) => mixed
};

class CheckboxWidget extends PureComponent<Props> {
  getHint = (): ?string => {
    const { rawErrors, options: { help } } = this.props;

    if (rawErrors) {
      return rawErrors.toString();
    }

    if (help) {
      return help;
    }

    return null;
  };

  render() {
    return (
      <Switcher
        className={styles.switcher}
        id={this.props.id}
        name={this.props.id}
        required={this.props.required}
        disabled={this.props.disabled}
        description={this.props.options.description}
        value={this.props.value}
        onChange={this.props.onChange}
        label={this.props.label}
        hint={this.getHint()}
      />
    );
  }
}

export default CheckboxWidget;
