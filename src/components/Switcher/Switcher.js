/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Switcher.css';

export type SwitcherProps = {
  className?: string,
  id: string,
  value: boolean,
  disabled?: boolean,
  onChange: () => void
}

class Switcher extends Component {
  props: SwitcherProps;

  static defaultProps = {
    value: false,
    disabled: false
  };

  shouldComponentUpdate(nextProps: SwitcherProps) {
    return nextProps.value !== this.props.value ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.id !== this.props.id ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { id, value, disabled } = this.props;
    const className = classNames(styles.root, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <input
          className={styles.input}
          checked={value}
          id={id}
          type="checkbox"
          onChange={this.props.onChange}
        />
        <label htmlFor={id} className={styles.label} />
      </div>
    );
  }
}

export default Switcher;
