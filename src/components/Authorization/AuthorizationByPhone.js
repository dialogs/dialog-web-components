/*
 * Copyright 2018 dialog LLC <info@dlg.im>
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
import styles from './Authorization.css';

export type Props = {
  id: string,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: PhoneValue,
  errors: ?{ [field: string]: AuthError },
  autoFocus?: boolean,
  onChange: (value: PhoneValue) => mixed,
  onRetry: () => mixed,
  onResendCode: () => mixed
};

export type State = {
  isCodeResendRequested: boolean,
  resendTimeout: number
};

class AuthorizationByPhone extends PureComponent<Props, State> {
  interval: ?IntervalID;
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

  handleChange = (value: string, event: SyntheticInputEvent<>): void => {
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
    this.setState(({ resendTimeout }) => {
      return {
        resendTimeout: resendTimeout - 1
      };
    }, () => {
      if (this.state.resendTimeout <= 0) {
        this.handleIntervalClear();
      }
    });
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
        hint: error.message,
        status: 'error'
      };
    }

    return null;
  }

  setPhoneInput = (input: *): void => {
    this.phoneInput = input;
  };

  renderCountrySelector() {
    const { step } = this.props;

    if (step >= LOGIN_SENT) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <CountryCodeSelector
          label="Authorization.choose_country"
          onChange={this.handleCountryChange}
          value={this.props.value.credentials.country}
          disabled={step >= LOGIN_SENT}
          className={styles.input}
        />
      </div>
    );
  }

  renderRetry() {
    const { step } = this.props;

    if (step < LOGIN_SENT || step > CODE_REQUESTED) {
      return null;
    }

    return <Text id="Authorization.wrong" onClick={this.props.onRetry} className={styles.retry} tagName="a" />;
  }

  renderResendCode() {
    const { step } = this.props;
    const { isCodeResendRequested, resendTimeout } = this.state;

    if (step < CODE_REQUESTED || step > CODE_SENT) {
      return null;
    }

    if (isCodeResendRequested) {
      return (
        <Text
          className={styles.resendTimer}
          id="Authorization.code_arrive"
          values={{ time: getHumanTime(resendTimeout * 1000) }}
        />
      );
    }

    return (
      <Text tagName="a" className={styles.resend} id="Authorization.resend_code" onClick={this.handleCodeResend} />
    );
  }

  renderPhoneInput() {
    const { step, id, value: { credentials } } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <PhoneInput
          {...this.getInputState('phone')}
          className={styles.input}
          id={`${id}_login`}
          name="phone"
          label="Authorization.phone"
          value={credentials.phone}
          disabled={step >= LOGIN_SENT}
          ref={this.setPhoneInput}
          onChange={this.handlePhoneChange}
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
        {this.renderCountrySelector()}
        {this.renderPhoneInput()}
        {this.renderCodeInput()}
        {this.renderResendCode()}
        {this.renderDataProcessingAgreement()}
      </div>
    );
  }
}

export default AuthorizationByPhone;
