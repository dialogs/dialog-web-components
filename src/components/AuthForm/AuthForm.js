/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import {
  AUTH_STARTED, LOGIN_SENT, CODE_REQUESTED,
  AUTH_FINISHED, SIGNUP_STARTED, NAME_SENT
} from './constants';
import styles from './AuthForm.css';

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

  renderButtonText() {
    const { step } = this.props;
    if (step < CODE_REQUESTED) {
      return <FormattedMessage id="AuthForm.request_code" />;
    }

    if (step < SIGNUP_STARTED) {
      return <FormattedMessage id="AuthForm.check_code" />;
    }

    if (step < AUTH_FINISHED) {
      return <FormattedMessage id="AuthForm.sign_up" />;
    }

    return <FormattedMessage id="AuthForm.success" />;
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
            disabled={step > LOGIN_SENT}
            onChange={this.handleChange}
          />
          {this.renderCode()}
          {this.renderName()}
          <div className={styles.button}>
            <Button type="submit" theme="raised" wide>
              {this.renderButtonText()}
            </Button>
          </div>
        </Fieldset>
      </form>
    );
  }
}

export default AuthForm;
