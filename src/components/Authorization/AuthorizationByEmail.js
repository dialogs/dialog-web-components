/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import type { EmailValue, InputState } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import InputNext from '../InputNext/InputNext';
import { LOGIN_SENT, CODE_REQUESTED, CODE_SENT } from './constants';
import styles from './Authorization.css';

export type Props = {
  id: string,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: EmailValue,
  errors: ?{ [field: string]: AuthError },
  autoFocus?: boolean,
  onRetry: () => mixed,
  onChange: (value: EmailValue) => mixed
};

class AuthorizationByEmail extends PureComponent<Props> {
  handleChange = (value: mixed, { target }: $FlowIssue): void => {
    this.props.onChange({
      type: this.props.value.type,
      credentials: {
        ...this.props.value.credentials,
        [target.name]: value
      }
    });
  };

  getInputState(field: string): ?InputState {
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

  renderRetry() {
    const { step } = this.props;

    if (step >= LOGIN_SENT) {
      return <Text id="Authorization.wrong" onClick={this.props.onRetry} className={styles.retry} tagName="a" />;
    }

    return null;
  }

  renderEmailInput() {
    const { step, id } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState('email')}
          className={styles.input}
          name="email"
          id={`${id}_login`}
          type="email"
          label="Authorization.email"
          value={this.props.value.credentials.email}
          disabled={step >= LOGIN_SENT}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
        {this.renderRetry()}
      </div>
    );
  }

  renderCodeInput() {
    const { step, id } = this.props;

    if (step < CODE_REQUESTED || step > CODE_SENT) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState('code')}
          className={styles.input}
          name="code"
          id={`${id}_code`}
          type="text"
          label="Authorization.code"
          value={this.props.value.credentials.code}
          disabled={step >= CODE_SENT}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }

  renderDataProcessingAgreement() {
    if (this.props.step > LOGIN_SENT) {
      return null;
    }

    return (
      <Text tagName="div" className={styles.dataProcessingAgreement} id="Authorization.data_processing_agreement" />
    );
  }

  render() {
    return (
      <div className={styles.formWrapper}>
        {this.renderEmailInput()}
        {this.renderCodeInput()}
        {this.renderDataProcessingAgreement()}
      </div>
    );
  }
}

export default AuthorizationByEmail;
