/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';

import styles from './Radio.css';
import { RadioGroupContext, type RadioGroupContextType } from './RadioGroupContext';

export type RadioProps = {
  className?: string,
  children: Node,
  id?: string,
  value: string,
  tabIndex?: number,
  htmlAutoFocus?: boolean,
  disabled?: boolean
};

class Radio extends PureComponent<RadioProps> {
  handleChange = (radioGroup: RadioGroupContextType) => (
    event: SyntheticInputEvent<HTMLInputElement>
  ): void => {
    radioGroup.onChange(event.target.value, event);
  };

  inputRef: {
    current: HTMLInputElement | null
  } = React.createRef();

  focus(): void {
    const { current: input } = this.inputRef;

    if (input) {
      input.focus();
    }
  }

  blur(): void {
    const { current: input } = this.inputRef;

    if (input) {
      input.blur();
    }
  }

  render() {
    const { children, id, value, tabIndex, htmlAutoFocus } = this.props;

    return (
      <RadioGroupContext.Consumer>
        {(radioGroup) => {
          if (!radioGroup) return null;

          const disabled = this.props.disabled || radioGroup.disabled;
          const className = classNames(styles.container, this.props.className, {
            [styles.labeled]: Boolean(children),
            [styles.disabled]: disabled
          });

          return (
            <label className={className} htmlFor={id}>
              <input
                id={id}
                className={styles.input}
                type="radio"
                tabIndex={tabIndex}
                value={value}
                autoFocus={htmlAutoFocus}
                checked={value === radioGroup.value}
                ref={this.inputRef}
                onChange={this.handleChange(radioGroup)}
                disabled={disabled}
              />
              <span className={styles.radio} />
              {children ? <div className={styles.label}>{children}</div> : null}
            </label>
          );
        }}
      </RadioGroupContext.Consumer>
    );
  }
}

export default Radio;
