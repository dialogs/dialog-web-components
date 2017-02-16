/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, PropTypes } from 'react';

export type Props = {
  className?: string,
  children?: mixed,
  name: string,
  value: string,
  onChange: (value: string, event: SyntheticInputEvent) => mixed
};

export type Context = {
  radioGroup: {
    name: string,
    value: string,
    onChange: (value: string, event: SyntheticInputEvent) => mixed
  }
};

class RadioGroup extends PureComponent {
  props: Props;

  static childContextTypes = {
    radioGroup: PropTypes.object.isRequired
  };

  getChildContext(): Context {
    return {
      radioGroup: {
        name: this.props.name,
        value: this.props.value,
        onChange: this.props.onChange
      }
    };
  }

  render(): React.Element<any> {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default RadioGroup;
