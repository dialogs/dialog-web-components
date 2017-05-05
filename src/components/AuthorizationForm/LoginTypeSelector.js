/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthType } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import styles from './AuthorizationForm.css';

export type Props = {
  type: AuthType,
  disabled: boolean,
  allowed: AuthType[],
  onTypeChange: (type: string) => any
};

class LoginTypeSelector extends PureComponent {
  props: Props;

  renderOptions() {
    return this.props.allowed.map((type) => {
      return (
        <Radio value={type} key={type} className={styles.type}>
          <Text id={`AuthorizationForm.type.${type}`} />
        </Radio>
      );
    });
  }

  render() {
    return (
      <RadioGroup
        name="login_type"
        value={this.props.type}
        disabled={this.props.disabled}
        onChange={this.props.onTypeChange}
        className={styles.typeSelector}
      >
        {this.renderOptions()}
      </RadioGroup>
    );
  }
}

export default LoginTypeSelector;
