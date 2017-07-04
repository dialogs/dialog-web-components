/*
* Copyright 2017 dialog LLC <info@dlg.im>
* @flow
*/

import type { AuthError } from '@dlghq/dialog-types';
import type { SignupInfo, InputState } from './types';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './AuthorizationForm.css';

import { NAME_SENT } from './constants';

export type Props = {
  id: string,
  info: SignupInfo,
  errors: ?{ [field: string]: AuthError },
  autoFocus?: boolean,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  isGenderEnabled: boolean,
  onChange: (info: SignupInfo) => any
};

class AuthorizationSignUp extends PureComponent {
  props: Props;


  handleChange = (value: any, { target }: $FlowIssue): void => {
    this.props.onChange({
      ...this.props.info,
      [target.name]: value
    });
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

  renderNameInput(): React.Element<any> {
    const { step, id } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState('name')}
          name="name"
          id={`${id}_name`}
          label="AuthorizationForm.name"
          value={this.props.info.name}
          disabled={step >= NAME_SENT}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }

  renderGenderSelector(): ?React.Element<any> {
    const { id, step, isGenderEnabled } = this.props;

    if (!isGenderEnabled) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <GenderSelect
          className={styles.input}
          name="gender"
          id={`${id}_gender`}
          label="AuthorizationForm.gender"
          value={this.props.info.gender}
          disabled={step >= NAME_SENT}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.formWrapper}>
        {this.renderNameInput()}
        {this.renderGenderSelector()}
      </div>
    );
  }
}

export default AuthorizationSignUp;
