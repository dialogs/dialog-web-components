/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Input from '../../InputNext/InputNext';
import styles from '../CustomForm.css';

type InputStatus = 'error' | 'normal';

export type Props = {
  id: string,
  placeholder: string,
  label?: ?string,
  value: any,
  type: *,
  required: boolean,
  disabled: boolean,
  readonly: boolean,
  autofocus: boolean,
  options: { [key: string]: string },
  rawErrors?: string[],
  onChange: (value: mixed) => mixed,
  onBlur: (id: string, value: mixed) => mixed,
  onFocus: (id: string, value: mixed) => mixed
};

class BaseInput extends PureComponent<Props> {
  static defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false
  };

  handleChange = (value: *) => {
    this.props.onChange(value === '' ? this.props.options.emptyValue : value);
  };

  handleBlur = ({ target: { value } }: $FlowIssue) => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.id, value);
    }
  };

  handleFocus = ({ target: { value } }: $FlowIssue) => {
    if (this.props.onFocus) {
      this.props.onFocus(this.props.id, value);
    }
  };

  getStatus = (): InputStatus => {
    const { rawErrors } = this.props;

    if (rawErrors) {
      return 'error';
    }

    return 'normal';
  };

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
    const { id, label, placeholder, value, readonly, disabled, autofocus, options, required, type } = this.props;

    return (
      <Input
        className={styles.input}
        id={id}
        name={id}
        label={label}
        placeholder={placeholder}
        readOnly={readonly}
        disabled={disabled}
        description={options.description}
        autoFocus={autofocus}
        required={required}
        type={type || 'text'}
        value={value === null ? '' : value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        status={this.getStatus()}
        hint={this.getHint()}
      />
    );
  }
}

export default BaseInput;
