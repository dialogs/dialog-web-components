/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ButtonNext from '../ButtonNext/ButtonNext';
import InputNext from '../InputNext/InputNext';
import styles from './UserNameAuthForm.css';

type AuthValue = {
  login: string,
  password: string
};

type Props = {
  id: string,
  className?: string,
  value: AuthValue,
  errors: { [field: string]: AuthError },
  pending: boolean,
  onChange: (value: AuthValue) => any,
  onSubmit: (value: AuthValue) => any
};

class UserNameAuthForm extends PureComponent {
  props: Props;

  static defaultProps = {
    id: 'form_login'
  };

  handleChange = (value: string, { target }: SyntheticInputEvent) => {
    this.props.onChange({
      ...this.props.value,
      [target.name]: value
    });
  };

  handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  };

  getInputState(field: string): ?{ hint: string, status: 'error' } {
    const { errors } = this.props;

    if (errors && errors[field]) {
      const error = errors[field];

      return {
        hint: `AuthorizationForm.errors.${error.tag}`,
        status: 'error'
      };
    }

    return null;
  }

  render() {
    const { id, pending } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <form className={className} id={id} autoComplete="off" onSubmit={this.handleSubmit}>
        <div className={styles.inputWrapper}>
          <InputNext
            {...this.getInputState('login')}
            className={styles.input}
            name="login"
            id={`${id}_login`}
            type="text"
            label="UserNameAuthForm.login"
            value={this.props.value.login}
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
            label="UserNameAuthForm.password"
            value={this.props.value.password}
            disabled={pending}
            onChange={this.handleChange}
          />
        </div>
        <ButtonNext type="submit" loading={pending}>
          <Text id="UserNameAuthForm.sign_in" />
        </ButtonNext>
      </form>
    );
  }
}

export default UserNameAuthForm;
