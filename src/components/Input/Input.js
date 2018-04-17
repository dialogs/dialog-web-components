/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Input.css';

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
  label?: string,
  large?: boolean,
  placeholder?: string,
  prefix?: ?string,
  disabled?: boolean,
  hint?: string,
  status: 'normal' | 'success' | 'error' | 'warning',
  autoFocus?: boolean,
  htmlAutoFocus?: boolean,
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

class Input extends PureComponent<Props, State> {
  context: Context;

  // refs
  input: ?(HTMLInputElement | HTMLTextAreaElement);

  static defaultProps = {
    type: 'text',
    status: 'normal',
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

  handleChange = (event: $FlowIssue): void => {
    this.props.onChange(event.target.value, event);
  };

  handleFocus = (event: $FlowIssue): void => {
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event: $FlowIssue): void => {
    if (this.isAutoFocus()) {
      event.preventDefault();
      event.target.focus();

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
    const { l10n } = this.context;

    if (!hint) {
      return null;
    }

    return (
      <p className={styles.hint}>
        {l10n.formatText(hint)}
      </p>
    );
  }

  renderPrefix() {
    const { prefix, id } = this.props;

    if (!prefix) {
      return null;
    }
    const className = classNames(styles.prefix, this.props.prefixClassName);

    return (
      <label htmlFor={id} className={className} onMouseDown={this.handleLabelMouseDown}>
        {prefix}
      </label>
    );
  }

  renderInput() {
    const {
      props: {
        id,
        name,
        type,
        value,
        disabled,
        tabIndex,
        placeholder,
        htmlAutoFocus,
        onKeyUp,
        onKeyDown,
        onKeyPress,
        spellcheck
      },
      context: { l10n }
    } = this;

    const props = {
      className: classNames(styles.input, this.props.inputClassName),
      disabled,
      id,
      name,
      placeholder: placeholder ? l10n.formatText(placeholder) : null,
      type,
      value,
      ref: this.setInput,
      tabIndex,
      autoFocus: htmlAutoFocus,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp
    };

    if (type === 'textarea') {
      return <textarea {...props} spellCheck={spellcheck ? 'true' : 'false'} />;
    }

    return <input {...props} spellCheck={spellcheck ? 'true' : 'false'} />;
  }

  render() {
    const { props: { value, disabled, status, large }, state: { isFocused } } = this;

    const className = classNames(
      styles.container,
      this.props.className,
      status ? styles[status] : null,
      value ? styles.filled : null,
      isFocused ? styles.focused : null,
      disabled ? styles.disabled : null,
      large ? styles.large : null
    );

    const wrapperClassName = classNames(styles.inputWrapper, this.props.wrapperClassName);

    return (
      <div className={className}>
        {this.renderLabel()}
        <div className={wrapperClassName}>
          {this.renderPrefix()}
          {this.renderInput()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
