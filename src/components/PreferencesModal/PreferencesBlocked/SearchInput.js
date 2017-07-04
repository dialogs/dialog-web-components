/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import styles from './Blocked.css';
import Field from '../../Field/Field';

export type Props = {
  onChange: (value: string) => void,
  placeholder: string
}

class SearchInput extends PureComponent {
  props: Props;

  handleChange: () => void;

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: $FlowIssue): void {
    this.props.onChange(event.target.value);
  }

  render() {
    const { placeholder } = this.props;

    return (
      <Field className={styles.inputField}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
      </Field>
    );
  }
}

export default SearchInput;
