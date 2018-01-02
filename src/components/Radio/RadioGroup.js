/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import PropTypes from 'prop-types';

export type Props = {
  className?: string,
  disabled?: boolean,
  children: Node,
  name: string,
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

class RadioGroup extends PureComponent<Props> {
  static childContextTypes = {
    radioGroup: PropTypes.object.isRequired
  };

  getChildContext(): Context {
    return {
      radioGroup: {
        name: this.props.name,
        value: this.props.value,
        onChange: this.props.onChange,
        disabled: this.props.disabled
      }
    };
  }

  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}

export default RadioGroup;
