/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { SidebarSearchProps } from './types';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './SidebarSearch.css';

class SidebarSearch extends Component {
  props: SidebarSearchProps;

  static contextTypes = {
    l10n: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps: SidebarSearchProps) {
    return nextProps.value !== this.props.value ||
           nextProps.isFocused !== this.props.isFocused ||
           nextProps.className !== this.props.className;
  }

  render() {
    const { value, isFocused } = this.props;
    const className = classNames(
      styles.container,
      {
        [styles.focused]: isFocused,
        [styles.filled]: Boolean(value)
      },
      this.props.className
    );

    const placeholder = this.context.l10n.formatText('SidebarSearch.placeholder');

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} />
        <input
          type="search"
          className={styles.input}
          placeholder={placeholder}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

export default SidebarSearch;
