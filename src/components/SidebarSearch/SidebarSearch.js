/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './SidebarSearch.css';

class SidebarSearch extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isFocused: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value ||
           nextState.isFocused !== this.state.isFocused ||
           nextProps.className !== this.props.className ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.onChange !== this.props.onChange ||
           nextProps.onFocus !== this.props.onFocus ||
           nextProps.onBlur !== this.props.onBlur;
  }

  handleChange(event) {
    const { onChange } = this.props;

    this.setState({ value: event.target.value });
    onChange(event.target.value, event);
  }

  handleFocus() {
    const { onFocus } = this.props;

    this.setState({ isFocused: true });
    onFocus && onFocus();
  }

  handleBlur() {
    const { onBlur } = this.props;

    this.setState({ isFocused: false });
    onBlur && onBlur();
  }


  render() {
    const { value, isFocused } = this.state;
    const { placeholder } = this.props;
    const className = classNames(styles.container, {
      [styles.focused]: isFocused,
      [styles.filled]: value && value !== ''
    }, this.props.className);

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} />
        <input
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default SidebarSearch;
