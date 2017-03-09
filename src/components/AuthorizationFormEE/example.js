import React, { Component } from 'react';
import AuthorizationFormEE from './AuthorizationFormEE';
import Button from '../ButtonNext/ButtonNext';
import {
  CHANGE_ENDPOINT, AUTH_STARTED, AUTH_PENDING, AUTH_FINISHED
} from './constants';

class ExampleAuthForm extends Component {
  static initialState = {
    step: AUTH_STARTED,
    value: {
      login: '',
      password: ''
    },
    endpoint: 'tls://'
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
        this.setState({ step: AUTH_PENDING });
        setTimeout(() => this.setState({ step: AUTH_FINISHED }), 2000);
        break;
      case AUTH_FINISHED:
        break;
      default:
        throw new Error(`Unexpected step ${this.state.step}`);
    }
  };

  handleFinish = () => {
    this.setState({ ...ExampleAuthForm.initialState });
  };

  handleRetry = () => {
    this.setState({ step: AUTH_STARTED });
  };

  handleEndpointChangeRequest = () => {
    this.setState({ step: CHANGE_ENDPOINT });
  };

  handleEndpointChange = (endpoint) => {
    this.setState({ endpoint });
  };

  handleEndpointSubmit = (endpoint) => {
    console.debug('handleEndpointSubmit', endpoint);
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
        <AuthorizationFormEE
          step={this.state.step}
          value={this.state.value}
          endpoint={this.state.endpoint}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onRetry={this.handleRetry}
          onEndpointSubmit={this.handleEndpointSubmit}
          onEndpointChange={this.handleEndpointChange}
          onEndpointChangeRequest={this.handleEndpointChangeRequest}
          isChangeEndpointEnabled
        />
        {this.renderFinished()}
      </div>
    );
  }
}

export default ExampleAuthForm;
