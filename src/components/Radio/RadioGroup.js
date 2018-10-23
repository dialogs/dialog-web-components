/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';

import { RadioGroupContext } from './RadioGroupContext';

export type RadioGroupProps = {
  className?: string,
  disabled: boolean,
  children: Node,
  name?: string,
  value: string,
  onChange: (value: string, event: SyntheticInputEvent<HTMLInputElement>) => mixed
};

export type Context = {
  radioGroup: {
    name: string,
    value: string,
    disabled?: boolean,
    onChange: (value: string, event: SyntheticInputEvent<HTMLInputElement>) => mixed
  }
};

class RadioGroup extends PureComponent<RadioGroupProps> {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { value, name, onChange, disabled } = this.props;

    return (
      <RadioGroupContext.Provider value={{ value, name, onChange, disabled }}>
        <div className={this.props.className}>{this.props.children}</div>
      </RadioGroupContext.Provider>
    );
  }
}

export default RadioGroup;
