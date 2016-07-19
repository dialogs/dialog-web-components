/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { Text } from '@dlghq/react-l10n';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import {
  AUTH_STARTED, LOGIN_SENT,
  CODE_REQUESTED, CODE_SENT,
  SIGNUP_STARTED, NAME_SENT,
  AUTH_FINISHED
} from './constants';

class AuthForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    step: PropTypes.oneOf([
      AUTH_STARTED,
      LOGIN_SENT,
      CODE_REQUESTED,
      SIGNUP_STARTED,
      NAME_SENT
    ]).isRequired,
    value: PropTypes.shape({
      login: PropTypes.string,
      code: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: 'form_login'
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, { target }) {
    this.props.onChange({
      ...this.props.value,
      [target.name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  }

  isLoading() {
    switch (this.props.step) {
      case LOGIN_SENT:
      case CODE_SENT:
      case NAME_SENT:
        return true;
      default: return false;
    }
  }

  renderButtonText() {
    const { step } = this.props;
    if (step < CODE_REQUESTED) {
      return <Text id="AuthForm.request_code" />;
    }

    if (step < SIGNUP_STARTED) {
      return <Text id="AuthForm.check_code" />;
    }

    if (step < AUTH_FINISHED) {
      return <Text id="AuthForm.sign_up" />;
    }

    return <Text id="AuthForm.success" />;
  }

  renderCode() {
    const { id, step, value } = this.props;

    if (step < CODE_REQUESTED) {
      return null;
    }

    return (
      <Input
        name="code"
        id={`${id}_code`}
        label="AuthForm.code"
        value={value.code}
        disabled={step >= CODE_SENT}
        onChange={this.handleChange}
      />
    );
  }

  renderName() {
    const { id, step, value } = this.props;

    if (step < SIGNUP_STARTED) {
      return null;
    }

    return (
      <Input
        name="name"
        id={`${id}_name`}
        label="AuthForm.name"
        value={value.name}
        disabled={step >= NAME_SENT}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    const { id, step, value } = this.props;

    return (
      <form id={this.props.id} onSubmit={this.handleSubmit}>
        <Fieldset legend="AuthForm.sign_in">
          <Input
            name="login"
            id={`${id}_login`}
            label="AuthForm.login"
            value={value.login}
            disabled={step >= LOGIN_SENT}
            onChange={this.handleChange}
          />
          {this.renderCode()}
          {this.renderName()}
          <Button type="submit" theme="primary" loading={this.isLoading()} wide>
            {this.renderButtonText()}
          </Button>
        </Fieldset>
      </form>
    );
  }
}

export default AuthForm;
