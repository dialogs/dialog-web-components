/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.css';

export type Props = {
  className?: string,
  label?: string | React.Element<any>,
  id: string,
  value: boolean,
  disabled: boolean,
  tabIndex?: number,
  onChange: (event: SyntheticInputEvent) => any
}

class Checkbox extends PureComponent {
  props: Props;
  input: ?HTMLInputElement;

  static defaultProps = {
    value: false,
    disabled: false
  };

  setInput = (input: ?HTMLInputElement): void => {
    this.input = input;
  };

  focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  blur(): void {
    if (this.input) {
      this.input.blur();
    }
  }

  render() {
    const { id, value, label, disabled, tabIndex, onChange } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          className={styles.checkbox}
          type="checkbox"
          id={id}
          checked={value}
          tabIndex={tabIndex}
          ref={this.setInput}
          onChange={onChange}
        />

        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
