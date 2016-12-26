/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Option } from '../Select/types';
import React, { PureComponent } from 'react';
import Select from '../Select/Select';

export type Props = {
  className?: string,
  value: string,
  options: Option[],
  onChange: (value: string) => any
};

class GenderSelect extends PureComponent {
  props: Props;

  static defaultProps = {
    options: [
      { value: 'unknown', title: '' },
      { value: 'female', title: 'GenderSelect.female' },
      { value: 'male', title: 'GenderSelect.male' }
    ]
  };

  render(): React.Element<any> {
    return (
      <Select
        className={this.props.className}
        value={this.props.value}
        options={this.props.options}
        onChange={this.props.onChange}
      />
    );
  }
}

export default GenderSelect;
