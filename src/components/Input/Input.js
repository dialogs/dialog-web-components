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
    large: PropTypes.boolean,
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
    large: false,
    disabled: false
  };

  static contextTypes = {
    l10n: PropTypes.shape({
      formatText: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value ||
           nextProps.hint !== this.props.hint ||
           nextProps.status !== this.props.status ||
           nextProps.size !== this.props.size ||
           nextProps.label !== this.props.label ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.type !== this.props.type ||
           nextProps.className !== this.props.className ||
           nextProps.name !== this.props.name ||
           nextProps.id !== this.props.id;
  }

  handleChange(event) {
    const { onChange } = this.props;

    onChange(event.target.value, event);
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
    const { hint } = this.props;

    if (!hint) {
      return null;
    }

    return (
      <Text id={hint} tagName="p" className={styles.hint} />
    );
  }

  render() {
    const {
      id, name, type, value, disabled, status, large,
      placeholder, onFocus, onBlur,
      onKeyUp, onKeyDown, onKeyPress
    } = this.props;
    const { l10n: { formatText } } = this.context;
    const TagName = type === 'textarea' ? 'textarea' : 'input';
    const className = classNames(styles.container, styles[status], {
      [styles.filled]: value && value !== '',
      [styles.large]: large
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderLabel()}
        <TagName
          id={id}
          name={name}
          className={styles.input}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={formatText(placeholder)}
          onChange={this.handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
        />
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
