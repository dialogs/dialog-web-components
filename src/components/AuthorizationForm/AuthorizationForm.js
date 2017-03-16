/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint max-lines: ["error", 500] */

import type { AuthError } from '@dlghq/dialog-types';
import type { Country } from '../CountryCodeSelector/types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ButtonNext from '../ButtonNext/ButtonNext';
import CountryCodeSelector from '../CountryCodeSelector/CountryCodeSelector';
import InputNext from '../InputNext/InputNext';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import GenderSelect from '../GenderSelect/GenderSelect';
import {
  AUTH_STARTED, LOGIN_SENT, CODE_REQUESTED, CODE_SENT, SIGNUP_STARTED, NAME_SENT, AUTH_FINISHED
} from './constants';
import styles from './AuthorizationForm.css';
import getHumanTime from '../../utils/getHumanTime';

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
  isGenderEnabled: boolean,
  onChange: (value: AuthValue) => any,
  onSubmit: (value: AuthValue) => any,
  onRetry: () => any,
  onCodeResend: () => any
};

export type State = {
  loginType: string,
  country: ?Country,
  isCodeResendRequested: boolean,
  resendTimeout: number
};

const RESEND_TIMEOUT = 120;

class AuthorizationForm extends PureComponent {
  props: Props;
  state: State;
  interval: ?number;

  static defaultProps = {
    id: 'form_login',
    isGenderEnabled: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      loginType: 'phone',
      country: null,
      isCodeResendRequested: false,
      resendTimeout: RESEND_TIMEOUT
    };
  }

  componentWillUnmount() {
    this.handleIntervalClear();
  }

  handleChange = (value: any, { target }: $FlowIssue) => {
    this.props.onChange({
      ...this.props.value,
      [target.name]: value
    });
  };

  handleSubmit = (event: $FlowIssue): void => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  };

  handleCountryChange = (country: Country): void => {
    this.setState({ country });
    this.props.onChange({
      ...this.props.value,
      login: country.code
    });
  };

  handleLoginTypeChange = (type: string): void => {
    this.setState({ loginType: type });
  };

  handleCodeResend = (): void => {
    this.props.onCodeResend();
    this.setState({ isCodeResendRequested: true });
    this.interval = setInterval(this.handleIntervalUpdate, 1000);
  };

  handleIntervalUpdate = (): void => {
    const resendTimeout = this.state.resendTimeout - 1;
    this.setState({ resendTimeout });

    if (resendTimeout === 0) {
      this.handleIntervalClear();
    }
  };

  handleIntervalClear = (): void => {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({
        isCodeResendRequested: false,
        resendTimeout: RESEND_TIMEOUT
      });
      this.interval = null;
    }
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

  renderCountrySelector(): React.Element<any> {
    const { step } = this.props;

    return (
      <CountryCodeSelector
        label="Choose country"
        onChange={this.handleCountryChange}
        value={this.state.country}
        className={styles.input}
        disabled={step >= LOGIN_SENT}
      />
    );
  }

  renderPhoneInput(): React.Element<any> {
    const { step, id } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState()}
          className={styles.input}
          name="login"
          id={`${id}_login`}
          type="tel"
          label="AuthorizationForm.phone"
          value={this.props.value.login}
          disabled={step >= LOGIN_SENT}
          autoFocus={this.props.autoFocus}
          onChange={this.handleChange}
        />
        {this.renderRetry()}
      </div>
    );
  }

  renderEmailInput(): React.Element<any> {
    const { step, id } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState()}
          className={styles.input}
          name="login"
          id={`${id}_login`}
          type="email"
          label="AuthorizationForm.email"
          value={this.props.value.login}
          disabled={step >= LOGIN_SENT}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }

  renderRetry(): ?React.Element<any> {
    const { step } = this.props;

    if (step >= LOGIN_SENT && step <= CODE_REQUESTED) {
      return (
        <Text
          id="AuthForm.wrong"
          onClick={this.props.onRetry}
          className={styles.retry}
          tagName="a"
        />
      );
    }

    return null;
  }

  renderResendCode(): ?React.Element<any> {
    const { isCodeResendRequested, resendTimeout } = this.state;

    if (isCodeResendRequested) {
      return (
        <Text
          className={styles.resendTimer}
          id="AuthorizationForm.code_arrive"
          onClick={this.handleCodeResend}
          values={{ time: getHumanTime(resendTimeout * 1000) }}
        />
      );
    }

    return (
      <Text
        tagName="a"
        className={styles.resend}
        id="AuthorizationForm.resend_code"
        onClick={this.handleCodeResend}
      />
    );
  }

  renderCodeInput(): React.Element<any> {
    const { step, id } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState()}
          className={styles.input}
          name="code"
          id={`${id}_code`}
          type="text"
          label="AuthorizationForm.code"
          value={this.props.value.code}
          disabled={step >= CODE_SENT}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }

  renderNameInput(): React.Element<any> {
    const { step, id } = this.props;

    return (
      <InputNext
        {...this.getInputState()}
        name="name"
        id={`${id}_name`}
        label="AuthorizationForm.name"
        value={this.props.value.name}
        disabled={step >= NAME_SENT}
        onChange={this.handleChange}
        autoFocus={this.props.autoFocus}
      />
    );
  }

  renderGenderSelector(): ?React.Element<any> {
    const { id, step, isGenderEnabled } = this.props;

    if (!isGenderEnabled || step < SIGNUP_STARTED) {
      return null;
    }

    return (
      <GenderSelect
        className={styles.input}
        name="gender"
        id={`${id}_gender`}
        label="AuthForm.gender"
        value={this.props.value.gender}
        onChange={this.handleChange}
      />
    );
  }

  renderPhoneLogin(): React.Element<any> {
    return (
      <div className={styles.stepWrapper}>
        {this.renderCountrySelector()}
        {this.renderPhoneInput()}
      </div>
    );
  }

  renderEmailLogin(): React.Element<any> {
    return (
      <div className={styles.stepWrapper}>
        {this.renderEmailInput()}
      </div>
    );
  }

  renderLogin(): ?React.Element<any> {
    const { loginType } = this.state;

    switch (loginType) {
      case 'phone':
        return this.renderPhoneLogin();
      case 'email':
        return this.renderEmailLogin();
      default:
        return null;
    }
  }

  renderLoginStep(): React.Element<any> {
    const { loginType } = this.state;

    return (
      <div key="login" className={styles.stepWrapper}>
        <RadioGroup name="login_type" value={loginType} onChange={this.handleLoginTypeChange}>
          <Radio value="phone" className={styles.type}>
            Phone
          </Radio>
          <Radio value="email" className={styles.type}>
            Email
          </Radio>
        </RadioGroup>
        {this.renderLogin()}
      </div>
    );
  }

  renderCodeStep(): React.Element<any> {
    const { loginType } = this.state;

    return (
      <div className={styles.stepWrapper} key="code">
        {
          loginType === 'phone'
            ? this.renderPhoneInput()
            : this.renderEmailInput()
        }
        {this.renderCodeInput()}
        {this.renderResendCode()}
      </div>
    );
  }

  renderSignupStep(): React.Element<any> {
    return (
      <div className={styles.stepWrapper} key="signup">
        {this.renderNameInput()}
        {this.renderGenderSelector()}
      </div>
    );
  }

  renderStep(): ?React.Element<any> {
    const { step } = this.props;

    switch (step) {
      case AUTH_STARTED:
      case LOGIN_SENT:
        return this.renderLoginStep();
      case CODE_REQUESTED:
      case CODE_SENT:
        return this.renderCodeStep();
      case SIGNUP_STARTED:
      case NAME_SENT:
        return this.renderSignupStep();
      default:
        return null;
    }
  }

  render() {
    const { id } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <form id={id} onSubmit={this.handleSubmit} className={className} autoComplete="off">
        {this.renderStep()}
        <ButtonNext type="submit" loading={this.isLoading()}>
          {this.renderButtonText()}
        </ButtonNext>
      </form>
    );
  }
}

export default AuthorizationForm;
