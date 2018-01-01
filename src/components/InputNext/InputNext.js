/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './InputNext.css';

type HTMLAbstractInputElement = HTMLInputElement | HTMLTextAreaElement;

export type Props = {
  className?: string,
  inputClassName?: string,
  id: string,
  type: 'text' | 'number' | 'email' | 'search' | 'tel' | 'url' | 'password' | 'textarea',
  value: string | number,
  name?: string,
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  hint?: ?string,
  status: 'normal' | 'success' | 'error',
  size: 'small' | 'normal',
  autoFocus?: boolean,
  tabIndex?: number,
  htmlAutoFocus?: boolean,
  spellcheck?: boolean,
  onChange: (value: string, event: SyntheticInputEvent<HTMLAbstractInputElement>) => mixed,
  onFocus?: (event: SyntheticFocusEvent<HTMLAbstractInputElement>) => mixed,
  onBlur?: (event: SyntheticFocusEvent<HTMLAbstractInputElement>) => mixed,
  onKeyUp?: (event: SyntheticKeyboardEvent<HTMLAbstractInputElement>) => mixed,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLAbstractInputElement>) => mixed,
  onKeyPress?: (event: SyntheticKeyboardEvent<HTMLAbstractInputElement>) => mixed
};

export type State = {
  isFocused: boolean
};

export type Context = ProviderContext;

class InputNext extends PureComponent<Props, State> {
  context: Context;
  input: ?HTMLAbstractInputElement;

  static defaultProps = {
    type: 'text',
    status: 'normal',
    size: 'normal',
    spellcheck: false
  };

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      isFocused: false
    };
  }

  componentDidMount(): void {
    this.autoFocus();
  }

  componentDidUpdate(): void {
    this.autoFocus();
  }

  handleChange = (event: SyntheticInputEvent<HTMLAbstractInputElement>): void => {
    this.props.onChange(event.target.value, event);
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLAbstractInputElement>): void => {
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLAbstractInputElement>): void => {
    const target = ((event.target: any): HTMLAbstractInputElement);

    if (this.isAutoFocus()) {
      event.preventDefault();
      target.focus();

      return;
    }

    this.setState({ isFocused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleLabelMouseDown = (event: $FlowIssue): void => {
    event.preventDefault();

    if (this.input) {
      this.input.focus();
    }
  };

  isAutoFocus(): boolean {
    return Boolean(this.props.autoFocus) && !this.props.disabled;
  }

  setInput = (element: *): void => {
    this.input = element;
  };

  autoFocus(): void {
    if (this.isAutoFocus() && this.input) {
      if (document.activeElement !== this.input) {
        this.input.focus();
      }
    }
  }

  focus(): void {
    if (this.input && document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  blur(): void {
    if (this.input) {
      this.input.blur();
    }
  }

  renderLabel() {
    const { id, label } = this.props;
    const { l10n } = this.context;

    if (!label) {
      return null;
    }

    return (
      <label className={styles.label} htmlFor={id} onMouseDown={this.handleLabelMouseDown}>
        {l10n.formatText(label)}
      </label>
    );
  }

  renderHint() {
    const { hint } = this.props;

    if (!hint) {
      return null;
    }

    const { l10n } = this.context;

    return <p className={styles.hint}>{l10n.formatText(hint)}</p>;
  }

  render() {
    const {
      id,
      name,
      type,
      value,
      disabled,
      tabIndex,
      status,
      htmlAutoFocus,
      placeholder,
      onKeyUp,
      onKeyDown,
      onKeyPress,
      size
    } = this.props;
    const { isFocused } = this.state;
    const { l10n } = this.context;

    const className = classNames(
      styles.container,
      status ? styles[status] : null,
      value ? styles.filled : null,
      isFocused ? styles.focused : null,
      disabled ? styles.disabled : null,
      styles[size],
      this.props.className
    );

    const inputClassName = classNames(styles.input, this.props.inputClassName);

    const TagName = type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className={className}>
        {this.renderLabel()}
        <TagName
          className={inputClassName}
          disabled={disabled}
          id={id}
          name={name}
          placeholder={placeholder ? l10n.formatText(placeholder) : null}
          type={type}
          value={value}
          ref={this.setInput}
          tabIndex={tabIndex}
          autoFocus={htmlAutoFocus}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          spellCheck={this.props.spellcheck ? 'true' : 'false'}
        />
        {this.renderHint()}
      </div>
    );
  }
}

export default InputNext;
