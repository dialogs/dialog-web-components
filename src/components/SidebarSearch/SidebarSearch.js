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
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFocused !== this.state.isFocused ||
           nextProps.className !== this.props.className ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.onChange !== this.props.onChange ||
           nextProps.onFocus !== this.props.onFocus ||
           nextProps.onBlur !== this.props.onBlur;
  }

  handleFocus() {
    this.setState({ isFocused: true });
    this.props.onFocus();
  }

  handleBlur() {
    this.setState({ isFocused: false });
    this.props.onBlur();
  }

  render() {
    const { isFocused } = this.state;
    const { placeholder, value } = this.props;
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
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default SidebarSearch;
