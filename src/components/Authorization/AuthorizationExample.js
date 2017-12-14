import type { AuthValue } from './types';
import React, { Component } from 'react';
import Authorization from './Authorization';
import Button from '../Button/Button';

import {
  AUTH_STARTED,
  LOGIN_SENT,
  CODE_REQUESTED,
  CODE_SENT,
  SIGNUP_STARTED,
  NAME_SENT,
  AUTH_FINISHED
} from './constants';

const defaultAuthCredentials = {
  email: {
    email: '',
    code: ''
  },
  phone: {
    phone: '',
    country: null,
    code: ''
  },
  username: {
    login: '',
    password: ''
  }
};

const defaultInfo = {
  name: '',
  gender: 'unknown'
};

class AuthorizationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: AUTH_STARTED,
      value: {
        type: 'phone',
        credentials: defaultAuthCredentials.phone
      },
      info: defaultInfo,
      errors: {}
    };
  }

  handleTypeChange = (type) => {
    this.setState({
      step: AUTH_STARTED,
      value: {
        type,
        credentials: defaultAuthCredentials[type]
      }
    });
  };

  handleChange = (value: AuthValue, info) => {
    this.setState({ value, info });
  };

  handleSubmit = () => {
    const { step, value: { type } } = this.state;

    if (type === 'username') {
      this.setState({ step: AUTH_FINISHED });
    } else {
      switch (step) {
        case AUTH_STARTED:
          this.setState({ step: LOGIN_SENT });
          setTimeout(() => this.setState({ step: CODE_REQUESTED }), 2000);
          break;
        case CODE_REQUESTED:
          this.setState({ step: CODE_SENT });
          if (this.state.login === 'bob@example.com') {
            setTimeout(() => this.setState({ step: AUTH_FINISHED }), 2000);
          } else {
            setTimeout(() => this.setState({ step: SIGNUP_STARTED }), 2000);
          }
          break;
        case SIGNUP_STARTED:
          this.setState({ step: NAME_SENT });
          setTimeout(() => this.setState({ step: AUTH_FINISHED }), 2000);
          break;
        case AUTH_FINISHED:
          break;
        default:
          throw new Error(`Unexpected step ${this.state.step}`);
      }
    }
  };

  handleResendCode = () => {
    console.debug('Resend code request');
  };

  handleRetry = () => {
    this.setState({ step: AUTH_STARTED });
  };

  handleFinish = () => {
    this.setState({
      step: AUTH_STARTED,
      info: defaultInfo,
      value: {
        type: 'phone',
        credentials: defaultAuthCredentials.phone
      }
    });
  };

  renderFinished() {
    if (this.state.step < AUTH_FINISHED) {
      return null;
    }

    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <Button size="small" onClick={this.handleFinish}>
          Restart Auth
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Authorization
          step={this.state.step}
          value={this.state.value}
          info={this.state.info}
          errors={this.state.errors}
          allowed={['phone', 'email', 'username']}
          onChange={this.handleChange}
          onTypeChange={this.handleTypeChange}
          onSubmit={this.handleSubmit}
          onRetry={this.handleRetry}
          isGenderEnabled
          onResendCode={this.handleResendCode}
        />
        {this.renderFinished()}
      </div>
    );
  }
}

export default AuthorizationExample;
