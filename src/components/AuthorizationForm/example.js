import React, { Component } from 'react';
import AuthorizationForm from './AuthorizationForm';
import Button from '../ButtonNext/ButtonNext';
import {
  AUTH_STARTED, LOGIN_SENT,
  CODE_REQUESTED, CODE_SENT,
  SIGNUP_STARTED, NAME_SENT,
  AUTH_FINISHED
} from './constants';

class ExampleAuthForm extends Component {
  static initialState = {
    step: AUTH_STARTED,
    value: {
      login: '',
      code: '',
      name: '',
      gender: 'unknown'
    }
  };

  constructor(props) {
    super(props);

    this.state = { ...ExampleAuthForm.initialState };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  handleSubmit = () => {
    switch (this.state.step) {
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
  };

  handleCodeResend = () => {
    console.debug('Resend code request');
  };

  handleFinish = () => {
    this.setState({ ...ExampleAuthForm.initialState });
  };

  handleRetry = () => {
    this.setState({ step: AUTH_STARTED });
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
        <AuthorizationForm
          step={this.state.step}
          value={this.state.value}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onRetry={this.handleRetry}
          onCodeResend={this.handleCodeResend}
        />
        {this.renderFinished()}
      </div>
    );
  }
}

export default ExampleAuthForm;
