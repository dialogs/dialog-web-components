/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
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
  onBlur?: () => any
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

  handleKeyDown = (event: SyntheticKeyboardEvent): void => {
    switch (event.key) {
      case 'Escape':
        if (this.input) {
          this.input.blur();
        }

        break;

      default:
      // do nothing
    }
  };

  setInput = (input: ?HTMLInputElement): void => {
    this.input = input;
  };

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
        <Icon glyph="search" className={styles.icon} />
        <input
          type="search"
          value={value}
          className={styles.input}
          placeholder={placeholder}
          ref={this.setInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

export default SidebarSearch;
