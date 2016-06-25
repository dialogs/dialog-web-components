import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Input.css';

class Input extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.node,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.oneOf([
      'text',
      'email',
      'number',
      'search',
      'tel',
      'url',
      'password',
      'file',
      'radio',
      'checkbox'
    ]).isRequired,
    disabled: PropTypes.bool.isRequired,
    hint: PropTypes.string,
    status: PropTypes.oneOf(['success', 'error']),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func
  };

  static defaultProps = {
    type: 'text',
    disabled: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value, event);
  }

  renderLabel() {
    if (!this.props.label) {
      return null;
    }

    const className = classNames(styles.label, {
      [styles.active]: this.props.value
    });

    return (
      <label className={className} htmlFor={this.props.id}>
        {this.props.label}
      </label>
    );
  }

  renderHint() {
    if (!this.props.hint) {
      return null;
    }

    return (
      <p className={styles.hint}>
        {this.props.hint}
      </p>
    );
  }

  render() {
    const className = classNames(
      styles.container,
      styles[this.props.status],
      this.props.className
    );

    return (
      <div className={className}>
        <input
          id={this.props.id}
          className={styles.input}
          type={this.props.type}
          value={this.props.value}
          disabled={this.props.disabled}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onFocus}
          onKeyUp={this.props.onKeyUp}
          onKeyDown={this.props.onKeyDown}
          onKeyPress={this.props.onKeyPress}
        />
        {this.renderLabel()}
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
