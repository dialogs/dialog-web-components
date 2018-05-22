/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import type { UserNameValue } from './types';
import { isEmpty } from 'lodash';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import styles from './Authorization.css';

type Props = {
  id: string,
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

  getInputHint(): ?string {
    const { errors } = this.props;

    if (errors) {
      const error = errors.login || errors.password;
      if (error) {
        return error.message;
      }
    }

    return null;
  }

  getInputStatus = () => {
    const { errors } = this.props;

    if (isEmpty(errors)) {
      return 'normal';
    }

    return 'error';
  };

  setInput = (input: *): void => {
    this.input = input;
  };

  render() {
    const { id, pending, value: { credentials } } = this.props;

    return (
      <div className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <InputNext
            status={this.getInputStatus()}
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
            hint={this.getInputHint()}
            status={this.getInputStatus()}
            className={styles.input}
            name="password"
            id={`${id}_pass`}
            type="password"
            label="Authorization.password"
            value={credentials.password}
            disabled={pending}
            autoComplete="current-password"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default AuthorizationByUsername;
