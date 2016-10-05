/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Radio.css';

export type Props = {
  className?: string,
  children?: any,
  value: string,
  name: string,
  defaultChecked: boolean,
  onChange: Function
}

class Radio extends Component {
  props: Props;

  handleChange: EventHandler;

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className ||
           nextProps.name !== this.props.name ||
           nextProps.value !== this.props.value;
  }

  handleChange(event: SyntheticEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.props.onChange(event.target.value, event);
    }
  }

  renderChildren(): ?React.Element<any> {
    const { children } = this.props;

    if (!children) {
      return null;
    }
    return (
      <div className={styles.label}>{children}</div>
    );
  }

  render(): React.Element<any> {
    const { children, name, value, defaultChecked } = this.props;
    const className = classNames(styles.container, {
      [styles.labeled]: children
    }, this.props.className);

    return (
      <label className={className}>
        <input
          type="radio"
          name={name}
          defaultChecked={defaultChecked}
          value={value}
          onChange={this.handleChange}
          className={styles.input}
        />
        <span className={styles.radio} />
        {this.renderChildren()}
      </label>
    );
  }
}

export default Radio;
