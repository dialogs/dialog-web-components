/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import styles from './ToolbarSearchInput.css';

export type Props = {
  className?: string,
  query: string,
  focus: boolean,
  pending: boolean,
  onFocus: (query: string) => mixed,
  onBlur: () => mixed,
  onCancel: () => mixed,
  onChange: (query: string) => mixed,
  onSearch: (query: string) => mixed
};

class ToolbarSearchInput extends PureComponent {
  props: Props;
  input: ?HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.handleSearch = debounce(this.handleSearch, 300);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.focus && !prevProps.focus) {
      this.focus();
    }
  }

  handleChange = (event: SyntheticInputEvent) => {
    this.handleSearch(event.target.value);
    this.props.onChange(event.target.value);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  handleSearch = (query: string) => {
    this.props.onSearch(query);
  };

  handleFocus = () => {
    this.props.onFocus(this.props.query);
  };

  handleBlur = () => {
    this.props.onBlur();
  };

  setInput = (input: ?HTMLInputElement) => {
    this.input = input;
  };

  focus() {
    if (this.input && document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  renderIcon() {
    const { pending } = this.props;

    if (pending) {
      return (
        <Spinner size="small" className={styles.spinner} />
      );
    }

    return (
      <Icon glyph="search" className={styles.icon} size={22} />
    );
  }

  renderClearIcon() {
    if (!this.props.query) {
      return null;
    }

    return (
      <Icon
        glyph="close"
        className={styles.cancel}
        size={18}
        onClick={this.handleCancel}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderIcon()}
        <input
          type="search"
          ref={this.setInput}
          className={styles.input}
          value={this.props.query}
          autoFocus={this.props.focus}
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
