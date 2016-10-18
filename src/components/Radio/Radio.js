/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Context } from './RadioGroup';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Radio.css';

export type Props = {
  className?: string,
  children?: any,
  id?: string,
  value: string
};

class Radio extends Component {
  props: Props;
  context: Context;
  handleChange: Function;

  static contextTypes = {
    radioGroup: PropTypes.object.isRequired
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps: Props, nextState: any, nextContext: Context): boolean {
    return nextContext !== this.context ||
           nextProps.value !== this.props.value ||
           nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className ||
           nextProps.id !== this.props.id;
  }

  handleChange(event: $FlowIssue): void {
    this.context.radioGroup.onChange(event.target.value, event);
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
    const { children, id, value } = this.props;
    const { radioGroup } = this.context;
    const className = classNames(styles.container, this.props.className, {
      [styles.labeled]: Boolean(children)
    });

    return (
      <label className={className}>
        <input
          className={styles.input}
          type="radio"
          id={id}
          name={radioGroup.name}
          value={value}
          checked={value === radioGroup.value}
          onChange={this.handleChange}
        />
        <span className={styles.radio} />
        {this.renderChildren()}
      </label>
    );
  }
}

export default Radio;
