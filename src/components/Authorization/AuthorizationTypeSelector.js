/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthType } from './types';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';

import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import styles from './Authorization.css';

export type Props = {
  type: AuthType,
  disabled: boolean,
  id: string,
  allowed: AuthType[],
  onChange: (type: string) => mixed,
};

class AuthorizationTypeSelector extends PureComponent<Props> {
  renderOptions(): Node {
    const { id } = this.props;

    return this.props.allowed.map((type) => {
      return (
        <Radio
          value={type}
          key={type}
          className={styles.type}
          id={`${id}_type_${type}`}
        >
          <Text id={`Authorization.type.${type}`} />
        </Radio>
      );
    });
  }

  render() {
    if (this.props.allowed.length < 2) {
      return null;
    }

    return (
      <RadioGroup
        name="login_type"
        value={this.props.type}
        disabled={this.props.disabled}
        onChange={this.props.onChange}
        className={styles.typeSelector}
      >
        {this.renderOptions()}
      </RadioGroup>
    );
  }
}

export default AuthorizationTypeSelector;
