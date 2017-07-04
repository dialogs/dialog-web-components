/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Input.css';

export type StringProps = {
  type: 'text' | 'email' | 'search' | 'tel' | 'url' | 'password' | 'textarea',
  value: string,
  onChange: (value: string, event: SyntheticInputEvent) => any
};

export type NumberProps = {
  type: 'number',
  value: number,
  onChange: (value: number, event: SyntheticInputEvent) => any
};

export type Props = (StringProps | NumberProps) & {
  className?: string,
  inputClassName?: string,
  wrapperClassName?: string,
  prefixClassName?: string,
  id: string,
  name?: string,
  label?: string,
  large?: boolean,
  placeholder?: string,
  prefix?: ?string,
  disabled?: bool,
  hint?: string,
  status: 'normal' | 'success' | 'error',
  autoFocus?: boolean,
  htmlAutoFocus?: boolean,
  tabIndex?: number,
  onFocus?: (event: SyntheticFocusEvent) => any,
  onBlur?: (event: SyntheticFocusEvent) => any,
  onKeyUp?: (event: SyntheticKeyboardEvent) => any,
  onKeyDown?: (event: SyntheticKeyboardEvent) => any,
  onKeyPress?: (event: SyntheticKeyboardEvent) => any
};

export type State = {
  isFocused: boolean
};

export type Context = ProviderContext;

class Input extends PureComponent {
  props: Props;
  state: State;
  context: Context;

  // refs
  input: ?(HTMLInputElement | HTMLTextAreaElement);

  static defaultProps = {
    type: 'text',
    status: 'normal'
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

  setInput = (element: HTMLInputElement | HTMLTextAreaElement): void => {
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

  renderLabel(): ?React.Element<any> {
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

  renderHint(): ?React.Element<any> {
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

  renderPrefix(): ?React.Element<any> {
    const { prefix, id } = this.props;

    if (!prefix) {
      return null;
    }
    const className = classNames(
      styles.prefix,
      this.props.prefixClassName,
    );

    return (
      <label
        htmlFor={id}
        className={className}
        onMouseDown={this.handleLabelMouseDown}
      >
        {prefix}
      </label>
    );
  }

  render(): React.Element<any> {
    const {
      props: {
        id, name, type, value, disabled, tabIndex,
        status, large, placeholder, htmlAutoFocus,
        onKeyUp, onKeyDown, onKeyPress
      },
      state: {
        isFocused
      },
      context: {
        l10n
      }
    } = this;

    const className = classNames(
      styles.container,
      this.props.className,
      status ? styles[status] : null,
      value ? styles.filled : null,
      isFocused ? styles.focused : null,
      disabled ? styles.disabled : null,
      large ? styles.large : null
    );

    const wrapperClassName = classNames(
      styles.inputWrapper,
      this.props.wrapperClassName,
    );

    const inputClassName = classNames(
      styles.input,
      this.props.inputClassName,
    );

    const TagName = type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className={className}>
        {this.renderLabel()}
        <div className={wrapperClassName}>
          {this.renderPrefix()}
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
          />
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
