/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { throttle } from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarSearchInput.css';

export type Props = {
  query: string,
  className?: string,
  onFocus: (query: string) => any,
  onBlur: () => any,
  onChange: (query: string) => any,
  onSearch: (query: string) => any
};

class ToolbarSearchInput extends PureComponent {
  props: Props;
  input: HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.handleSearch = throttle(this.handleSearch, 300);
  }

  handleChange = (event: $FlowIssue) => {
    this.props.onChange(event.target.value);
    this.handleSearch();
  };

  handleClear = () => {
    this.props.onChange('');
    this.focus();
  };

  handleSearch = () => {
    this.props.onSearch(this.props.query);
  };

  handleFocus = () => {
    this.props.onFocus(this.props.query);
  };

  handleBlur = () => {
    this.props.onBlur();
  };

  setInput = (input: HTMLInputElement) => {
    this.input = input;
  };

  focus() {
    this.input.focus();
  }

  renderClearIcon() {
    if (!this.props.query) {
      return null;
    }

    return (
      <Icon
        glyph="close"
        className={styles.clear}
        size={18}
        onClick={this.handleClear}
      />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} size={22} />
        <input
          type="search"
          ref={this.setInput}
          className={styles.input}
          value={this.props.query}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        {this.renderClearIcon()}
      </div>
    );
  }
}

export default ToolbarSearchInput;
