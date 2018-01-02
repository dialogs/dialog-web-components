/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Switcher.css';

export type SwitcherProps = {
  className?: string,
  children?: Node,
  id: string,
  danger: boolean,
  name: string,
  value: boolean,
  disabled: boolean,
  hint?: ?string,
  tabIndex?: number,
  onChange: (value: boolean, event: SyntheticInputEvent<>) => mixed
}

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

  renderChildren() {
    const { children, id } = this.props;

    if (!children) {
      return null;
    }

    return (
      <label htmlFor={id} className={styles.label}>{children}</label>
    );
  }

  renderHint() {
    const { hint } = this.props;
    if (!hint) {
      return null;
    }

    return (
      <Text
        className={styles.hint}
        id={hint}
        tagName="div"
      />
    );
  }

  render() {
    const { id, value, disabled, name, tabIndex, danger } = this.props;
    const className = classNames(styles.container, {
      [styles.checked]: value,
      [styles.disabled]: disabled,
      [styles.danger]: danger
    });

    const switcher = (
      <div className={className}>
        <input
          className={styles.input}
          id={id}
          name={name}
          checked={value}
          type="checkbox"
          tabIndex={tabIndex}
          ref={this.setInput}
          onChange={this.handleChange}
        />
        <label htmlFor={id} className={styles.switcher} />
        {this.renderChildren()}
      </div>
    );

    const hint = this.renderHint();
    if (hint) {
      return (
        <div className={this.props.className}>
          {switcher}
          {hint}
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        {switcher}
      </div>
    );
  }
}

export default Switcher;
