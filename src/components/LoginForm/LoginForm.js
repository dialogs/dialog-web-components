/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Input from '../Input/Input';

class LoginForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    login: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    onLoginChange: PropTypes.func.isRequired,
    onCodeChange: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: 'form_login'
  };

  renderLogin() {
    const { id, login, onLoginChange } = this.props;
    return (
      <Input
        id={`${id}_login`}
        label="LoginForm.login"
        value={login}
        onChange={onLoginChange}
      />
    );
  }

  renderCode() {
    const { id, code, onCodeChange } = this.props;
    return (
      <Input
        id={`${id}_code`}
        label="LoginForm.code"
        value={code}
        onChange={onCodeChange}
      />
    );
  }

  renderName() {
    const { id, name, onNameChange } = this.props;
    return (
      <Input
        id={`${id}_name`}
        label="LoginForm.name"
        value={name}
        onChange={onNameChange}
      />
    );
  }

  render() {
    return (
      <form id={this.props.id}>
        <fieldset>
          <FormattedMessage id="LoginForm.sign_in" tagName="legend" />
          {this.renderLogin()}
          {this.renderCode()}
          {this.renderName()}
        </fieldset>
      </form>
    );
  }
}

export default LoginForm;
