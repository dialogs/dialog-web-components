/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import type { UserNameValue } from './types';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import styles from './Authorization.css';

type Props = {
  id: string,
  className?: string,
  value: UserNameValue,
  errors: ?{ [field: string]: AuthError },
  pending: boolean,
  autoFocus?: boolean,
  onChange: (value: UserNameValue) => mixed
};

class AuthorizationByUsername extends PureComponent<Props> {
  input: ?InputNext;

  componentDidMount() {
    if (this.input) {
      if (this.props.autoFocus) {
        this.input.focus();
      }
    }
  }

  handleChange = (value: string, { target }: SyntheticInputEvent<>) => {
    this.props.onChange({
      type: 'username',
      credentials: {
        ...this.props.value.credentials,
        [target.name]: value
      }
    });
  };

  getInputState(field: string): ?{ hint: string, status: 'error' } {
    const { errors } = this.props;

    if (errors && errors[field]) {
      const error = errors[field];

      return {
        hint: `Authorization.errors.${error.tag}`,
        status: 'error'
      };
    }

    return null;
  }

  setInput = (input: *): void => {
    this.input = input;
  };

  render() {
    const { id, pending, value: { credentials } } = this.props;

    return (
      <div className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <InputNext
            {...this.getInputState('login')}
            className={styles.input}
            name="login"
            id={`${id}_login`}
            type="text"
            label="Authorization.login"
            ref={this.setInput}
            value={credentials.login}
            disabled={pending}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <InputNext
            {...this.getInputState('password')}
            className={styles.input}
            name="password"
            id={`${id}_pass`}
            type="password"
            label="Authorization.password"
            value={credentials.password}
            disabled={pending}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default AuthorizationByUsername;
