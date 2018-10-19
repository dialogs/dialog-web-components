/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './InputNext.css';

type HTMLAbstractInputElement = HTMLInputElement | HTMLTextAreaElement;

export type Props = {
  className?: string,
  inputClassName?: string,
  wrapperClassName?: string,
  prefixClassName?: string,
  id: string,
  type: 'text' | 'number' | 'email' | 'search' | 'tel' | 'url' | 'password' | 'textarea',
  value: string | number,
  name?: string,
  label?: ?string,
  placeholder?: ?string,
  disabled?: boolean,
  hint?: ?string,
  prefix?: ?string,
  status: 'default' | 'success' | 'error',
  size: 'small' | 'normal',
  autoFocus?: boolean,
  tabIndex?: number,
  maxLength?: number,
  lengthLimitCounter?: boolean,
  htmlAutoFocus?: boolean,
  spellcheck?: boolean,
  readOnly?: boolean,
  required: boolean,
  description?: ?string,
  autoComplete?: ?string,
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

  static contextTypes = {
    l10n: LocalizationContextType
  };

  static defaultProps = {
    type: 'text',
    status: 'default',
    size: 'normal',
    spellcheck: false,
    required: false
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

    if (!label) {
      return null;
    }

    return (
      <label className={styles.label} htmlFor={id} onMouseDown={this.handleLabelMouseDown}>
        <Text id={label} />
        {this.props.required ? <Text id="InputNext.required" tagName="small" /> : null}
      </label>
    );
  }

  renderHint() {
    const { hint } = this.props;

    if (!hint) {
      return null;
    }

    return <Text className={styles.hint} id={hint} />;
  }

  renderDescription() {
    if (!this.props.description) {
      return null;
    }

    return <Text className={styles.description} id={this.props.description} />;
  }

  renderPrefix() {
    if (this.props.type === 'textarea' || !this.props.prefix) {
      return null;
    }

    const prefixClassName = classNames(styles.prefix, this.props.prefixClassName);

    return (
      <div className={prefixClassName} onMouseDown={this.handleLabelMouseDown}>
        {this.props.prefix}
      </div>
    );
  }

  renderLengthLimitCounter() {
    const {
      maxLength,
      lengthLimitCounter
    } = this.props;

    if (!maxLength && !lengthLimitCounter) {
      return null;
    }

    const input = this.input;
    let value = input && input.value;
    value = value || '';
    const length = value.length;

    return (
      <div
        className={styles.lengthLimitCounter}
      >
        {`${length} ${maxLength ? `/ ${maxLength}` : ''}`}
      </div>
    );
  }

  renderInput() {
    const {
      id,
      name,
      type,
      value,
      disabled,
      tabIndex,
      htmlAutoFocus,
      placeholder,
      onKeyUp,
      onKeyDown,
      onKeyPress,
      prefix,
      maxLength
    } = this.props;
    const { l10n: { formatText } } = this.context;

    const inputClassName = classNames(styles.input, this.props.inputClassName, {
      [styles.textarea]: type === 'textarea',
      [styles.prefixed]: Boolean(prefix)
    });

    const TagName = type === 'textarea' ? 'textarea' : 'input';


    return (
      <TagName
        className={inputClassName}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder ? formatText(placeholder) : null}
        type={type}
        value={value}
        ref={this.setInput}
        tabIndex={tabIndex}
        autoFocus={htmlAutoFocus}
        maxLength={maxLength}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        spellCheck={this.props.spellcheck ? 'true' : 'false'}
        required={this.props.required}
        readOnly={this.props.readOnly}
        autoComplete={this.props.autoComplete}
      />
    );
  }

  render() {
    const {
      value,
      disabled,
      status,
      size,
      readOnly
    } = this.props;
    const { isFocused } = this.state;

    const className = classNames(
      styles.container,
      status ? styles[status] : null,
      value ? styles.filled : null,
      isFocused ? styles.focused : null,
      disabled ? styles.disabled : null,
      readOnly ? styles.readonly : null,
      styles[size],
      this.props.className
    );
    const wrapperClassName = classNames(styles.inputWrapper, this.props.wrapperClassName);

    return (
      <div className={className}>
        {this.renderLabel()}
        {this.renderLengthLimitCounter()}
        {this.renderDescription()}
        <div className={wrapperClassName}>
          {this.renderPrefix()}
          {this.renderInput()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default InputNext;
