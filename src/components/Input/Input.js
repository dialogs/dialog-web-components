import React, { Component, PropTypes } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Input.css';

class Input extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
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
      'checkbox',
      'textarea'
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

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value ||
           nextProps.hint !== this.props.hint ||
           nextProps.status !== this.props.status ||
           nextProps.label !== this.props.label ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.type !== this.props.type ||
           nextProps.className !== this.props.className ||
           nextProps.name !== this.props.name ||
           nextProps.id !== this.props.id;
  }

  handleChange(event) {
    this.props.onChange(event.target.value, event);
  }

  renderLabel() {
    const { id, label } = this.props;
    if (!label) {
      return null;
    }

    return (
      <Text
        id={label}
        tagName="label"
        className={styles.label}
        htmlFor={id}
      />
    );
  }

  renderHint() {
    if (!this.props.hint) {
      return null;
    }

    return (
      <Text id={this.props.hint} tagName="p" className={styles.hint} />
    );
  }

  render() {
    const className = classNames(
      styles.container,
      styles[this.props.status],
      this.props.className
    );

    const TagName = this.props.type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className={className}>
        {this.renderLabel()}
        <TagName
          id={this.props.id}
          name={this.props.name}
          className={styles.input}
          type={this.props.type}
          value={this.props.value}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onKeyUp={this.props.onKeyUp}
          onKeyDown={this.props.onKeyDown}
          onKeyPress={this.props.onKeyPress}
        />
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
