import React, { Component } from 'react';
import AuthForm from './AuthForm';
import Button from '../Button/Button';
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleSubmit() {
    switch (this.state.step) {
      case AUTH_STARTED:
        this.setState({ step: LOGIN_SENT });
        setTimeout(() => this.setState({ step: CODE_REQUESTED }), 3000);
        break;
      case CODE_REQUESTED:
        this.setState({ step: CODE_SENT });
        if (this.state.login === 'bob@example.com') {
          setTimeout(() => this.setState({ step: AUTH_FINISHED }), 3000);
        } else {
          setTimeout(() => this.setState({ step: SIGNUP_STARTED }), 3000);
        }
        break;
      case SIGNUP_STARTED:
        this.setState({ step: NAME_SENT });
        setTimeout(() => this.setState({ step: AUTH_FINISHED }), 3000);
        break;
      case AUTH_FINISHED:
        break;
      default:
        throw new Error(`Unexpected step ${this.state.step}`);
    }
  }

  handleFinish() {
    this.setState({ ...ExampleAuthForm.initialState });
  }

  renderFinished() {
    if (this.state.step < AUTH_FINISHED) {
      return null;
    }

    return (
      <Button theme="primary" onClick={this.handleFinish}>
        Restart Auth
      </Button>
    );
  }

  render() {
    return (
      <div>
        {this.renderFinished()}
        <AuthForm
          step={this.state.step}
          value={this.state.value}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default ExampleAuthForm;
