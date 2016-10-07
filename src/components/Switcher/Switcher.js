/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Switcher.css';

export type SwitcherProps = {
  className?: string,
  children?: any,
  id: string,
  name: string,
  value: boolean,
  disabled: boolean,
  onChange: (value: boolean, event: SyntheticEvent) => void
}

class Switcher extends Component {
  props: SwitcherProps;

  handleChange: Function;

  static defaultProps = {
    value: false,
    disabled: false
  };

  constructor(props: SwitcherProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps: SwitcherProps): boolean {
    return nextProps.value !== this.props.value ||
           nextProps.name !== this.props.name ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.id !== this.props.id ||
           nextProps.className !== this.props.className;
  }

  handleChange(event: $FlowIssue): void {
    this.props.onChange(event.target.checked, event);
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
    const { id, value, disabled, name } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          className={styles.input}
          checked={value}
          id={id}
          name={name}
          type="checkbox"
          onChange={this.handleChange}
        />
        <label htmlFor={id} className={styles.switcher} />
        {this.renderChildren()}
      </div>
    );
  }
}

export default Switcher;
