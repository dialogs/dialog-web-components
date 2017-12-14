/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import type { AuthValue } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import AuthorizationTypeSelector from './AuthorizationTypeSelector';
import AuthorizationByPhone from './AuthorizationByPhone';
import AuthorizationByEmail from './AuthorizationByEmail';
import AuthorizationByUsername from './AuthorizationByUsername';
import ButtonNext from '../ButtonNext/ButtonNext';
import { LOGIN_SENT, CODE_REQUESTED, CODE_SENT, SIGNUP_STARTED, NAME_SENT, AUTH_FINISHED } from './constants';
import styles from './Authorization.css';

type Props = {};

class Authorization extends PureComponent<Props> {
  static defaultProps = {
    id: 'authorization_form',
    autoFocus: true,
    allowed: ['phone', 'email', 'username']
  };

  handleChange = (value: AuthValue) => {
    this.props.onChange(value);
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

  renderButtonText() {
    const { step, value: { type } } = this.props;

    if (type === 'username') {
      return <Text id="Authorization.sign_in" />;
    }

    if (step < CODE_REQUESTED) {
      return <Text id="Authorization.request_code" />;
    }

    if (step < SIGNUP_STARTED) {
      return <Text id="Authorization.check_code" />;
    }

    if (step < AUTH_FINISHED) {
      return <Text id="Authorization.sign_up" />;
    }

    return <Text id="Authorization.success" />;
  }

  renderTypeSelector() {
    return (
      <AuthorizationTypeSelector
        allowed={this.props.allowed}
        id={this.props.id}
        type={this.props.value.type}
        disabled={false}
        onChange={this.props.onTypeChange}
      />
    );
  }

  renderForm() {
    const { value, step, errors, autoFocus, id } = this.props;

    switch (value.type) {
      case 'phone':
        return (
          <AuthorizationByPhone
            id={id}
            step={step}
            value={value}
            errors={errors}
            autoFocus={autoFocus}
            onRetry={this.props.onRetry}
            onResendCode={this.props.onResendCode}
            onChange={this.handleChange}
            onSubmit={this.props.onSubmit}
          />
        );
      case 'email':
        return (
          <AuthorizationByEmail
            id={id}
            step={step}
            value={value}
            errors={errors}
            autoFocus={autoFocus}
            onRetry={this.props.onRetry}
            onChange={this.handleChange}
            onSubmit={this.props.onSubmit}
          />
        );
      case 'username':
        return (
          <AuthorizationByUsername
            id={id}
            value={value}
            errors={errors}
            autoFocus={autoFocus}
            onChange={this.handleChange}
            onSubmit={this.props.onSubmit}
          />
        );
      default:
        console.warn('Unsupported auth type');

        return null;
    }
  }

  render() {
    const { id, step } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <form id={id} onSubmit={this.handleSubmit} className={className} autoComplete="off">
        {this.renderTypeSelector()}
        {this.renderForm()}
        <ButtonNext type="submit" loading={this.isLoading()} id={`${id}_step_${step}_button`}>
          {this.renderButtonText()}
        </ButtonNext>
      </form>
    );
  }
}

export default Authorization;
