/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
/* eslint max-lines: ["error", 500] */

import type { Country } from '../CountryCodeSelector/types';
import type { Props, State, InputState } from './types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ButtonNext from '../ButtonNext/ButtonNext';
import CountryCodeSelector from '../CountryCodeSelector/CountryCodeSelector';
import InputNext from '../InputNext/InputNext';
import GenderSelect from '../GenderSelect/GenderSelect';
import LoginTypeSelector from './LoginTypeSelector';
import getHumanTime from '../../utils/getHumanTime';
import {
  AUTH_STARTED, LOGIN_SENT, CODE_REQUESTED, CODE_SENT, SIGNUP_STARTED, NAME_SENT, AUTH_FINISHED,
  RESEND_TIMEOUT
} from './constants';
import styles from './AuthorizationForm.css';

class AuthorizationForm extends PureComponent {
  props: Props;
  state: State;
  interval: ?number;
  phoneInput: ?InputNext;

  static defaultProps = {
    id: 'form_login',
    isGenderEnabled: true,
    allowed: ['phone', 'email']
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isCodeResendRequested: false,
      resendTimeout: RESEND_TIMEOUT
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.step < CODE_REQUESTED || nextProps.step > CODE_SENT) {
      this.handleIntervalClear();
    }
  }

  componentWillUnmount() {
    this.handleIntervalClear();
  }

  handleChange = (value: any, { target }: $FlowIssue) => {
    this.props.onChange({
      ...this.props.value,
      [target.name]: value
    }, this.props.info);
  };

  handleInfoChange = (value: any, { target }: $FlowIssue) => {
    this.props.onChange(this.props.value, {
      ...this.props.info,
      [target.name]: value
    });
  };

  handleSubmit = (event: $FlowIssue): void => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  };

  handleCountryChange = (country: Country): void => {
    this.props.onChange({
      ...this.props.value,
      country
    }, this.props.info);

    if (this.phoneInput) {
      this.phoneInput.focus();
    }
  };

  handleCodeResend = (): void => {
    this.props.onResendCode();
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

  getInputState(field: string): ?InputState {
    const { errors } = this.props;

    if (errors[field]) {
      const error = errors[field];
      return {
        hint: `AuthorizationForm.errors.${error.tag}`,
        status: 'error'
      };
    }

    return null;
  }

  setPhoneInput = (input: InputNext): void => {
    this.phoneInput = input;
  };

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
        label="AuthorizationForm.choose_country"
        onChange={this.handleCountryChange}
        value={this.props.value.country}
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
          {...this.getInputState('login')}
          className={styles.input}
          name="phone"
          id={`${id}_login`}
          type="tel"
          ref={this.setPhoneInput}
          label="AuthorizationForm.phone"
          value={this.props.value.phone}
          disabled={step >= LOGIN_SENT}
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
          {...this.getInputState('login')}
          className={styles.input}
          name="email"
          id={`${id}_login`}
          type="email"
          label="AuthorizationForm.email"
          value={this.props.value.email}
          disabled={step >= LOGIN_SENT}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
        {this.renderRetry()}
      </div>
    );
  }

  renderRetry(): ?React.Element<any> {
    const { step } = this.props;

    if (step >= LOGIN_SENT && step <= CODE_REQUESTED) {
      return (
        <Text
          id="AuthorizationForm.wrong"
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

    if (this.props.value.type !== 'phone') {
      return null;
    }

    if (isCodeResendRequested) {
      return (
        <Text
          className={styles.resendTimer}
          id="AuthorizationForm.code_arrive"
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
          {...this.getInputState('code')}
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
        {...this.getInputState('name')}
        name="name"
        id={`${id}_name`}
        label="AuthorizationForm.name"
        value={this.props.info.name}
        disabled={step >= NAME_SENT}
        onChange={this.handleInfoChange}
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
        label="AuthorizationForm.gender"
        value={this.props.info.gender}
        disabled={step >= NAME_SENT}
        onChange={this.handleInfoChange}
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
    const { value: { type } } = this.props;

    switch (type) {
      case 'phone':
        return this.renderPhoneLogin();
      case 'email':
        return this.renderEmailLogin();
      default:
        console.error('This form doesn\'t support this type of login "%s"', type);
        return null;
    }
  }

  renderLoginStep(): React.Element<any> {
    const { allowed, value: { type } } = this.props;

    return (
      <div key="login" className={styles.stepWrapper}>
        {allowed.length > 1 ? (
          <LoginTypeSelector
            allowed={allowed}
            type={type}
            onTypeChange={this.props.onTypeChange}
          />
        ) : null}
        {this.renderLogin()}
      </div>
    );
  }

  renderInputByType(type) {
    switch (type) {
      case 'phone':
        return this.renderPhoneInput();
      case 'email':
        return this.renderEmailInput();
      default:
        return null;
    }
  }

  renderCodeStep(): React.Element<any> {
    const { value: { type } } = this.props;

    return (
      <div className={styles.stepWrapper} key="code">
        {this.renderInputByType(type)}
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
