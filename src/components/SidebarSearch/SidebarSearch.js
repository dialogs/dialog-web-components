/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { Component } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './SidebarSearch.css';

export type Props = {
  className?: string,
  value: string,
  onChange: (value: string) => any,
  onFocus?: () => any,
  onBlur?: () => any,
  onKeyDown?: (event: SyntheticInputEvent) => any
};

export type Context = ProviderContext;

class SidebarSearch extends Component {
  props: Props;
  context: Context;
  input: ?HTMLInputElement;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.value !== this.props.value ||
           nextProps.className !== this.props.className;
  }

  handleChange = (event: SyntheticInputEvent): void => {
    this.props.onChange(event.target.value);
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

  render(): React.Element<any> {
    const { value } = this.props;
    const { l10n } = this.context;

    const className = classNames(
      styles.container,
      value ? styles.filled : null,
      this.props.className
    );

    const placeholder = l10n.formatText('SidebarSearch.placeholder');

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} size={20} />
        <input
          type="search"
          value={value}
          className={styles.input}
          placeholder={placeholder}
          ref={this.setInput}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onKeyDown={this.props.onKeyDown}
        />
      </div>
    );
  }
}

export default SidebarSearch;
