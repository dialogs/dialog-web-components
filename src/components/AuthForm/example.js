import React, { Component } from 'react';
import AuthForm from './AuthForm';
import {
  AUTH_STARTED, LOGIN_SENT, CODE_REQUESTED,
  AUTH_FINISHED, SIGNUP_STARTED, NAME_SENT
} from './constants';

class ExampleAuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: AUTH_STARTED,
      value: {
        login: '',
        code: '',
        name: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      case AUTH_FINISHED:
      case SIGNUP_STARTED:
      case NAME_SENT:
      default:
        throw new Error(`Unexpected step ${this.state.step}`);
    }
  }

  render() {
    return (
      <AuthForm
        step={this.state.step}
        value={this.state.value}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default ExampleAuthForm;
