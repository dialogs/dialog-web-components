/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint max-lines: ["error", 500] */

import type { AuthError } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ButtonNext from '../ButtonNext/ButtonNext';
import InputNext from '../InputNext/InputNext';
import {
  CHANGE_ENDPOINT, AUTH_STARTED, AUTH_PENDING, AUTH_FINISHED
} from './constants';
import styles from './AuthorizationFormEE.css';

export type AuthValue = {
  login: string,
  password: string
};

export type Props = {
  id: string,
  className?: string,
  step: 0 | 1 | 2 | 3,
  value: AuthValue,
  error: ?AuthError,
  autoFocus?: boolean,
  onChange: (value: AuthValue) => any,
  onSubmit: (value: AuthValue) => any,
  onRetry: () => any,
  endpoint?: string,
  isChangeEndpointEnabled: boolean,
  onEndpointChangeRequest: () => any,
  onEndpointSubmit: (endpoint: string) => any,
  onEndpointChange: (endpoint: string) => any
};


class AuthorizationFormEE extends PureComponent {
  props: Props;

  static defaultProps = {
    id: 'form_login'
  };

  handleChange = (value: any, { target }: $FlowIssue) => {
    this.props.onChange({
      ...this.props.value,
      [target.name]: value
    });
  };

  handleSubmit = (event: $FlowIssue): void => {
    const { step } = this.props;
    event.preventDefault();

    switch (step) {
      case CHANGE_ENDPOINT:
        this.props.onEndpointSubmit(this.props.endpoint);
        break;
      default:
        this.props.onSubmit(this.props.value);
        break;
    }
  };

  isLoading(): boolean {
    switch (this.props.step) {
      case AUTH_PENDING:
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

  renderRetry(): ?React.Element<any> {
    const { step } = this.props;

    if (step >= AUTH_PENDING && step <= AUTH_FINISHED) {
      return (
        <Text
          id="AuthorizationFormEE.wrong"
          onClick={this.props.onRetry}
          className={styles.retry}
          tagName="a"
        />
      );
    }

    return null;
  }


  renderLoginStep(): React.Element<any> {
    const { step, id } = this.props;

    return (
      <div key="login" className={styles.stepWrapper}>
        <div className={styles.inputWrapper}>
          <InputNext
            {...this.getInputState()}
            className={styles.input}
            name="login"
            id={`${id}_login`}
            type="text"
            label="AuthorizationFormEE.login"
            value={this.props.value.login}
            disabled={step >= AUTH_PENDING}
            onChange={this.handleChange}
            autoFocus={this.props.autoFocus}
          />
          {this.renderRetry()}
        </div>
        <div className={styles.inputWrapper}>
          <InputNext
            {...this.getInputState()}
            className={styles.input}
            name="password"
            id={`${id}_pass`}
            type="password"
            label="AuthorizationFormEE.password"
            value={this.props.value.password}
            disabled={step >= AUTH_PENDING}
            onChange={this.handleChange}
            autoFocus={this.props.autoFocus}
          />
        </div>
      </div>
    );
  }

  renderEndpointStep(): React.Element<any> {
    const { id } = this.props;

    return (
      <div className={styles.stepWrapper} key="endpoint">
        <div className={styles.inputWrapper}>
          <InputNext
            className={styles.input}
            name="endpoint"
            id={`${id}_endpoint`}
            type="text"
            label="AuthorizationFormEE.endpoint"
            value={this.props.endpoint}
            onChange={this.props.onEndpointChange}
            autoFocus
          />
        </div>
      </div>
    );
  }

  renderStep(): React.Element<any> {
    const { step } = this.props;

    switch (step) {
      case CHANGE_ENDPOINT:
        return this.renderEndpointStep();
      default:
        return this.renderLoginStep();
    }
  }

  renderChangeEndpoint(): ?React.Element<any> {
    const { isChangeEndpointEnabled, step } = this.props;

    if (!isChangeEndpointEnabled || step === CHANGE_ENDPOINT) {
      return null;
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <Text
          id="AuthorizationFormEE.save_endpoint"
          onClick={this.props.onEndpointChangeRequest}
          className={styles.endpoint}
        />
      </div>
    );
  }

  renderSubmitButton() {
    const { step } = this.props;

    switch (step) {
      case CHANGE_ENDPOINT:
        return (
          <ButtonNext type="submit" loading={this.isLoading()}>
            <Text id="AuthorizationFormEE.change_endpoint" />
          </ButtonNext>
        );
      default:
        return (
          <ButtonNext type="submit" loading={this.isLoading()}>
            <Text id="AuthorizationFormEE.sign_in" />
          </ButtonNext>
        );
    }
  }

  render() {
    const { id } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <form id={id} onSubmit={this.handleSubmit} className={className} autoComplete="off">
        {this.renderStep()}
        {this.renderSubmitButton()}
        {this.renderChangeEndpoint()}
      </form>
    );
  }
}

export default AuthorizationFormEE;
