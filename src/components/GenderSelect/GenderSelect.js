/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from '../Select/types';
import React, { PureComponent } from 'react';
import Select from '../Select/Select';

class GenderSelect extends PureComponent {
  props: Props;

  static defaultProps = {
    options: [
      {
        value: 'unknown',
        title: 'GenderSelect.unknown'
      },
      {
        value: 'female',
        title: 'GenderSelect.female'
      },
      {
        value: 'male',
        title: 'GenderSelect.male'
      }
    ]
  };

  render() {
    return <Select {...this.props} />;
  }
}

export default GenderSelect;
