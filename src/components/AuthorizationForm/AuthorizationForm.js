/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props, AuthValue, SignupInfo } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ButtonNext from '../ButtonNext/ButtonNext';
import LoginTypeSelector from './LoginTypeSelector';
import AuthorizationPhoneLogin from './AuthorizationPhoneLogin';
import AuthorizationEmailLogin from './AuthorizationEmailLogin';
import AuthorizationSignUp from './AuthorizationSignUp';
import { LOGIN_SENT, CODE_REQUESTED, CODE_SENT, SIGNUP_STARTED, NAME_SENT, AUTH_FINISHED } from './constants';
import styles from './AuthorizationForm.css';

class AuthorizationForm extends PureComponent {
  props: Props;

  static defaultProps = {
    id: 'form_login',
    isGenderEnabled: true,
    allowed: ['phone', 'email']
  };

  handleChange = (value: AuthValue) => {
    this.props.onChange(value, this.props.info);
  };

  handleInfoChange = (info: SignupInfo) => {
    this.props.onChange(this.props.value, info);
  };

  handleSubmit = (event: $FlowIssue): void => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  };

  isLoading(): boolean {
    switch (this.props.step) {
      case LOGIN_SENT:
      case CODE_SENT:
      case NAME_SENT:
        return true;
      default:
        return false;
    }
  }

  renderButtonText(): React.Element<any> {
    const { step } = this.props;

    if (step < CODE_REQUESTED) {
      return <Text id="AuthorizationForm.request_code" />;
    }

    if (step < SIGNUP_STARTED) {
      return <Text id="AuthorizationForm.check_code" />;
    }

    if (step < AUTH_FINISHED) {
      return <Text id="AuthorizationForm.sign_up" />;
    }

    return <Text id="AuthorizationForm.success" />;
  }

  renderTypeSelector(): ?React.Element<any> {
    const { allowed, value: { type }, step } = this.props;

    if (allowed.length <= 1) {
      return null;
    }

    return (
      <LoginTypeSelector
        allowed={allowed}
        type={type}
        disabled={step > CODE_SENT}
        onTypeChange={this.props.onTypeChange}
      />
    );
  }

  renderForm(): ?React.Element<any> {
    const { value, step, errors, info, autoFocus, id, isGenderEnabled } = this.props;

    if (step < SIGNUP_STARTED) {
      switch (value.type) {
        case 'phone':
          return (
            <AuthorizationPhoneLogin
              id={id}
              step={step}
              value={value}
              errors={errors}
              autoFocus={autoFocus}
              onRetry={this.props.onRetry}
              onResendCode={this.props.onResendCode}
              onChange={this.handleChange}
            />
          );
        case 'email':
          return (
            <AuthorizationEmailLogin
              id={this.props.id}
              step={step}
              value={value}
              errors={errors}
              autoFocus={this.props.autoFocus}
              onRetry={this.props.onRetry}
              onChange={this.handleChange}
            />
          );
        default:
          console.error('This form doesn\'t support this type of login "%s"', value.type);

          return null;
      }
    } else {
      return (
        <AuthorizationSignUp
          onChange={this.handleInfoChange}
          id={id}
          step={step}
          info={info}
          errors={errors}
          autoFocus={autoFocus}
          isGenderEnabled={isGenderEnabled}
        />
      );
    }
  }

  render() {
    const { id } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <form id={id} onSubmit={this.handleSubmit} className={className} autoComplete="off">
        {this.renderTypeSelector()}
        {this.renderForm()}
        <ButtonNext type="submit" loading={this.isLoading()}>
          {this.renderButtonText()}
        </ButtonNext>
      </form>
    );
  }
}

export default AuthorizationForm;
