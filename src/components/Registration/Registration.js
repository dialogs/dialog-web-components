/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthError } from '@dlghq/dialog-types';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import InputNext from '../InputNext/InputNext';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './Registration.css';

export type SignupInfo = {
  name: string,
  gender: string
};

export type InputState = {
  hint: string,
  status: 'error'
};

export type Props = {
  className?: string,
  id: string,
  info: SignupInfo,
  errors: ?{ [field: string]: AuthError },
  autoFocus?: boolean,
  isGenderEnabled: boolean,
  onChange: (info: SignupInfo) => mixed
};

class Registration extends PureComponent<Props> {
  input: ?InputNext;

  static defaultProps = {
    id: 'registration'
  };

  componentDidMount() {
    if (this.input) {
      if (this.props.autoFocus) {
        this.input.focus();
      }
    }
  }

  handleChange = (value: mixed, { target }: $FlowIssue): void => {
    this.props.onChange({
      ...this.props.info,
      [target.name]: value
    });
  };

  handleGenderChange = (value: string): void => {
    this.props.onChange({
      ...this.props.info,
      gender: value
    });
  };

  getInputState(field: string): ?InputState {
    const { errors } = this.props;

    if (errors && errors[field]) {
      const error = errors[field];

      return {
        hint: `Registration.errors.${error.tag}`,
        status: 'error'
      };
    }

    return null;
  }

  setInput = (input: *) => {
    this.input = input;
  };

  renderNameInput() {
    const { id } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <InputNext
          {...this.getInputState('name')}
          name="name"
          id={`${id}_name`}
          label="Registration.name"
          value={this.props.info.name}
          onChange={this.handleChange}
          ref={this.setInput}
        />
      </div>
    );
  }

  renderGenderSelector() {
    const { id, isGenderEnabled } = this.props;

    if (!isGenderEnabled) {
      return null;
    }

    return (
      <div className={styles.inputWrapper}>
        <GenderSelect
          className={styles.input}
          name="gender"
          id={`${id}_gender`}
          label="Registration.gender"
          value={this.props.info.gender}
          onChange={this.handleGenderChange}
        />
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderNameInput()}
        {this.renderGenderSelector()}
      </div>
    );
  }
}

export default Registration;
