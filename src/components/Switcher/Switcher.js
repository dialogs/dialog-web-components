/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './Switcher.css';

export type SwitcherProps = {
  className?: string,
  children?: any,
  id: string,
  name: string,
  value: boolean,
  disabled: boolean,
  tabIndex?: number,
  onChange: (value: boolean, event: SyntheticEvent) => void
}

class Switcher extends PureComponent {
  props: SwitcherProps;
  input: ?HTMLInputElement;

  static defaultProps = {
    value: false,
    disabled: false
  };

  handleChange = (event: $FlowIssue): void => {
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

  renderChildren(): ?React.Element<any> {
    const { children, id } = this.props;

    if (!children) {
      return null;
    }

    return (
      <label htmlFor={id} className={styles.label}>{children}</label>
    );
  }

  render(): React.Element<any> {
    const { id, value, disabled, name, tabIndex } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled
    });

    return (
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
  }
}

export default Switcher;
