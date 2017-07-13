/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import type { PhoneValue, InputState } from './types';
import type { Country } from '../CountryCodeSelector/types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import CountryCodeSelector from '../CountryCodeSelector/CountryCodeSelector';
import InputNext from '../InputNext/InputNext';
import PhoneInput from '../PhoneInput/PhoneInput';
import getHumanTime from '../../utils/getHumanTime';
import { LOGIN_SENT, CODE_REQUESTED, CODE_SENT, RESEND_TIMEOUT } from './constants';
import styles from './AuthorizationForm.css';

export type Props = {
  id: string,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: PhoneValue,
  errors: ?{ [field: string]: AuthError },
  autoFocus?: boolean,
  onChange: (value: PhoneValue) => any,
  onRetry: () => any,
  onResendCode: () => any
};

export type State = {
  isCodeResendRequested: boolean,
  resendTimeout: number
};

class AuthorizationPhoneLogin extends PureComponent {
  props: Props;
  state: State;
  interval: ?number;
  phoneInput: ?PhoneInput;

  constructor(props: Props) {
    super(props);

    this.state = {
      isCodeResendRequested: false,
      resendTimeout: RESEND_TIMEOUT
    };
  }

  componentDidMount() {
    if (this.phoneInput) {
      if (this.props.autoFocus) {
        this.phoneInput.focus();
      }
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.step < CODE_REQUESTED || nextProps.step > CODE_SENT) {
      this.handleIntervalClear();
    } else if (this.props.step === LOGIN_SENT && nextProps.step === CODE_REQUESTED) {
      this.setState({ isCodeResendRequested: true });
      this.handleIntervalClear();
      this.interval = setInterval(this.handleIntervalUpdate, 1000);
    }
  }

  componentWillUnmount() {
    this.handleIntervalClear();
  }

  handleChange = (value: string, event: SyntheticInputEvent): void => {
    this.props.onChange({
      type: this.props.value.type,
      credentials: {
        ...this.props.value.credentials,
        [event.target.name]: value
      }
    });
  };

  handlePhoneChange = (phone: string, country: ?Country) => {
    this.props.onChange({
      type: this.props.value.type,
      credentials: {
        ...this.props.value.credentials,
        phone,
        country: country || this.props.value.credentials.country
      }
    });
  };

  handleCountryChange = (country: Country): void => {
    this.props.onChange({
      type: this.props.value.type,
      credentials: {
        ...this.props.value.credentials,
        phone: country.code,
        country
      }
    });

    if (this.phoneInput) {
      this.phoneInput.focus();
    }
  };

  handleCodeResend = (): void => {
    this.setState({ isCodeResendRequested: true });
    this.handleIntervalClear();
    this.interval = setInterval(this.handleIntervalUpdate, 1000);
    this.props.onResendCode();
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

  getInputState(field: string): ?InputState {
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

  setPhoneInput = (input: PhoneInput): void => {
    this.phoneInput = input;
  };

  renderCountrySelector(): ?React.Element<any> {
    const { step } = this.props;

    if (step >= LOGIN_SENT) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <CountryCodeSelector
          label="AuthorizationForm.choose_country"
          onChange={this.handleCountryChange}
          value={this.props.value.credentials.country}
          disabled={step >= LOGIN_SENT}
          className={styles.input}
        />
      </div>
    );
  }

  renderRetry(): ?React.Element<any> {
    const { step } = this.props;

    if (step < LOGIN_SENT || step > CODE_REQUESTED) {
      return null;
    }

    return (
      <Text
        id="AuthorizationForm.wrong"
        onClick={this.props.onRetry}
        className={styles.retry}
        tagName="a"
      />
    );
  }

  renderResendCode(): ?React.Element<any> {
    const { step } = this.props;
    const { isCodeResendRequested, resendTimeout } = this.state;

    if (step < CODE_REQUESTED || step > CODE_SENT) {
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

  renderPhoneInput(): React.Element<any> {
    const { step, id, value: { credentials } } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <PhoneInput
          {...this.getInputState('phone')}
          className={styles.input}
          id={`${id}_login`}
          name="phone"
          label="AuthorizationForm.phone"
          value={credentials.phone}
          disabled={step >= LOGIN_SENT}
          ref={this.setPhoneInput}
          onChange={this.handlePhoneChange}
        />
        {this.renderRetry()}
      </div>
    );
  }

  renderCodeInput(): ?React.Element<any> {
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
          label="AuthorizationForm.code"
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
      <Text
        tagName="div"
        className={styles.dataProcessingAgreement}
        id="AuthorizationForm.data_processing_agreement"
      />
    );
  }

  render() {
    return (
      <div className={styles.formWrapper}>
        {this.renderCountrySelector()}
        {this.renderPhoneInput()}
        {this.renderCodeInput()}
        {this.renderResendCode()}
        {this.renderDataProcessingAgreement()}
      </div>
    );
  }
}

export default AuthorizationPhoneLogin;
