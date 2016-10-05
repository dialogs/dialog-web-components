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
    large: PropTypes.bool,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
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

    this.state = {
      isFocused: false
    };

    this.input = null;

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleLabelMouseDown = this.handleLabelMouseDown.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isFocused !== this.state.isFocused ||
           nextProps.value !== this.props.value ||
           nextProps.hint !== this.props.hint ||
           nextProps.status !== this.props.status ||
           nextProps.large !== this.props.large ||
           nextProps.label !== this.props.label ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.type !== this.props.type ||
           nextProps.className !== this.props.className ||
           nextProps.name !== this.props.name ||
           nextProps.id !== this.props.id;
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value, event);
    }
  }

  handleFocus(event) {
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleBlur(event) {
    this.setState({ isFocused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleLabelMouseDown(event) {
    event.preventDefault();

    if (this.input) {
      this.input.focus();
    }
  }

  setInput(element) {
    this.input = element;
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
        onMouseDown={this.handleLabelMouseDown}
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

  renderPrefix() {
    const { prefix, id } = this.props;

    if (!prefix) {
      return null;
    }

    return (
      <label
        htmlFor={id}
        className={styles.prefix}
        onMouseDown={this.handleLabelMouseDown}
      >
        {prefix}
      </label>
    );
  }

  render() {
    const {
      id, name, type, value, disabled, status, large,
      placeholder, onKeyUp, onKeyDown, onKeyPress
    } = this.props;
    const { isFocused } = this.state;
    const { l10n: { formatText } } = this.context;
    const TagName = type === 'textarea' ? 'textarea' : 'input';
    const className = classNames(styles.container, styles[status], {
      [styles.filled]: value && value !== '',
      [styles.focused]: isFocused,
      [styles.disabled]: disabled,
      [styles.large]: large
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderLabel()}
        <div className={styles.inputWrapper}>
          {this.renderPrefix()}
          <TagName
            className={styles.input}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onKeyUp={onKeyUp}
            placeholder={formatText(placeholder)}
            ref={this.setInput}
            type={type}
            value={value}
          />
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
