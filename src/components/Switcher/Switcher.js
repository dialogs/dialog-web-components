/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Switcher.css';

export type SwitcherProps = {
  className?: string,
  id: string,
  danger: boolean,
  name: string,
  value: boolean,
  disabled: boolean,
  hint?: ?string,
  tabIndex?: number,
  label?: ?string,
  description?: ?string,
  onChange: (value: boolean, event: SyntheticInputEvent<>) => mixed
};

class Switcher extends PureComponent<SwitcherProps> {
  input: ?HTMLInputElement;

  static defaultProps = {
    value: false,
    danger: false,
    disabled: false
  };

  handleChange = (event: SyntheticInputEvent<>): void => {
    if (!this.props.disabled) {
      this.props.onChange(event.target.checked, event);
    }
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

  renderLabel() {
    const { label, id } = this.props;

    if (!label) {
      return null;
    }

    return <Text className={styles.label} id={label} tagName="label" htmlFor={id} />;
  }

  renderHint() {
    const { hint } = this.props;

    if (!hint) {
      return null;
    }

    return <Text className={styles.hint} id={hint} tagName="div" />;
  }

  renderDescription() {
    const { description } = this.props;

    if (!description) {
      return null;
    }

    return <Text className={styles.description} id={description} tagName="div" />;
  }

  render() {
    const { id, value, disabled, name, tabIndex, danger } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled,
      [styles.danger]: danger
    });

    return (
      <div className={styles.wrapper}>
        {this.renderDescription()}
        <div className={className}>
          <input
            className={styles.input}
            id={id}
            name={name}
            value={value}
            checked={value}
            type="checkbox"
            tabIndex={tabIndex}
            ref={this.setInput}
            onChange={this.handleChange}
          />
          <label htmlFor={id} className={styles.switcher} />
          {this.renderLabel()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default Switcher;
