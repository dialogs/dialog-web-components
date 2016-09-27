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

export type SidebarSearchProps = {
  className?: string,
  value: string,
  onChange: (value: string) => any,
  onFocus?: () => any,
  onBlur?: () => any
};

export type SidebarSearchContext = ProviderContext;

class SidebarSearch extends Component {
  props: SidebarSearchProps;
  context: SidebarSearchContext;

  handleChange: Function;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: SidebarSearchProps, context: SidebarSearchContext) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: $FlowIssue): void {
    this.props.onChange(event.target.value, event);
  }

  render() {
    const { value } = this.props;

    const className = classNames(
      styles.container,
      value ? styles.filled : null,
      this.props.className
    );

    const placeholder = this.context.l10n.formatText('SidebarSearch.placeholder');

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} />
        <input
          type="search"
          value={value}
          className={styles.input}
          placeholder={placeholder}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

export default SidebarSearch;
