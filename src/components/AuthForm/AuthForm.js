/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { AuthError } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Input from '../Input/Input';
import Button from '../Button/Button';
import GenderSelect from '../GenderSelect/GenderSelect';
import {
  LOGIN_SENT, CODE_REQUESTED, CODE_SENT,
  SIGNUP_STARTED, NAME_SENT, AUTH_FINISHED
} from './constants';
import styles from './AuthForm.css';

export type AuthValue = {
  login: string,
  code: string,
  name: string,
  gender: string
};

export type Props = {
  id: string,
  className?: string,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: AuthValue,
  error: ?AuthError,
  autoFocus?: boolean,
  onChange: (value: AuthValue) => any,
  onSubmit: (value: AuthValue) => any,
  onRetry: () => any,
  isGenderEnabled: boolean
};

class AuthForm extends PureComponent {
  props: Props;

  static defaultProps = {
    id: 'form_login',
    isGenderEnabled: true
  };

  handleChange = (value, { target }) => {
    this.props.onChange({
      ...this.props.value,
      [target.name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  };

  isLoading() {
    switch (this.props.step) {
      case LOGIN_SENT:
      case CODE_SENT:
      case NAME_SENT:
        return true;
      default:
        return false;
    }
  }

  getInputState(): ?{ hint: string, status: 'error' } {
    const { error } = this.props;

    if (error) {
      return {
        hint: error.message,
        status: 'error'
      };
    }

    return null;
  }

  renderButtonText() {
    const { step } = this.props;
    if (step < CODE_REQUESTED) {
      return <Text id="AuthForm.request_code" />;
    }

    if (step < SIGNUP_STARTED) {
      return <Text id="AuthForm.check_code" />;
    }

    if (step < AUTH_FINISHED) {
      return <Text id="AuthForm.sign_up" />;
    }

    return <Text id="AuthForm.success" />;
  }

  renderLogin() {
    const { id, step } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <Input
          {...this.getInputState()}
          name="login"
          id={`${id}_login`}
          label="AuthForm.login"
          value={this.props.value.login}
          disabled={step >= LOGIN_SENT}
          autoFocus={this.props.autoFocus}
          onChange={this.handleChange}
        />
        {
          step >= LOGIN_SENT && step <= CODE_REQUESTED ? (
            <Text
              id="AuthForm.wrong"
              onClick={this.props.onRetry}
              className={styles.retry}
            />
          ) : null
        }
      </div>
    );
  }

  renderCode() {
    const { id, step } = this.props;

    if (step < CODE_REQUESTED || step > CODE_SENT) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <Input
          {...this.getInputState()}
          name="code"
          id={`${id}_code`}
          label="AuthForm.code"
          value={this.props.value.code}
          disabled={step >= CODE_SENT}
          autoFocus={this.props.autoFocus}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  renderName() {
    const { id, step } = this.props;

    if (step < SIGNUP_STARTED) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <Input
          {...this.getInputState()}
          name="name"
          id={`${id}_name`}
          label="AuthForm.name"
          value={this.props.value.name}
          disabled={step >= NAME_SENT}
          autoFocus={this.props.autoFocus}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  renderGender() {
    const { id, step, isGenderEnabled } = this.props;
    if (!isGenderEnabled || step < SIGNUP_STARTED) {
      return null;
    }

    return (
      <GenderSelect
        className={styles.select}
        name="gender"
        id={`${id}_gender`}
        label="AuthForm.gender"
        value={this.props.value.gender}
        onChange={this.handleChange}
      />
    );
  }

  renderDataProcessingAgreement() {
    if (this.props.step > LOGIN_SENT) {
      return null;
    }

    return (
      <Text
        tagName="div"
        className={styles.dataProcessingAgreement}
        id="AuthForm.data_processing_agreement"
      />
    );
  }

  render() {
    const { id } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <form id={id} onSubmit={this.handleSubmit} className={className} autoComplete="off">
        {this.renderLogin()}
        {this.renderCode()}
        {this.renderName()}
        {this.renderGender()}
        <Button type="submit" theme="primary" loading={this.isLoading()} wide>
          {this.renderButtonText()}
        </Button>
        {this.renderDataProcessingAgreement()}
      </form>
    );
  }
}

export default AuthForm;
