/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Context } from './RadioGroup';
import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Radio.css';

export type Props = {
  className?: string,
  children?: any,
  id?: string,
  value: string,
  tabIndex?: number,
  htmlAutoFocus?: boolean
};

class Radio extends PureComponent {
  props: Props;
  context: Context;
  input: ?HTMLInputElement;

  static contextTypes = {
    radioGroup: PropTypes.object.isRequired
  };

  handleChange = (event: SyntheticInputEvent): void => {
    this.context.radioGroup.onChange(event.target.value, event);
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
    const { children } = this.props;
    if (!children) {
      return null;
    }

    return (
      <div className={styles.label}>{children}</div>
    );
  }

  render(): React.Element<any> {
    const { children, id, value, tabIndex, htmlAutoFocus } = this.props;
    const { radioGroup } = this.context;
    const className = classNames(styles.container, this.props.className, {
      [styles.labeled]: Boolean(children),
      [styles.disabled]: radioGroup.disabled
    });

    return (
      <label className={className}>
        <input
          className={styles.input}
          type="radio"
          id={id}
          name={radioGroup.name}
          tabIndex={tabIndex}
          value={value}
          autoFocus={htmlAutoFocus}
          checked={value === radioGroup.value}
          ref={this.setInput}
          onChange={this.handleChange}
          disabled={radioGroup.disabled}
        />
        <span className={styles.radio} />
        {this.renderChildren()}
      </label>
    );
  }
}

export default Radio;
