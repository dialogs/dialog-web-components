import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from '../Input/Input.css';

class Textarea extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.node,
    value: PropTypes.string,
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
           nextProps.disabled !== this.props.disabled ||
           nextProps.className !== this.props.className ||
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
      <label className={styles.label} htmlFor={id}>
        <FormattedMessage id={label} />
      </label>
    );
  }

  renderHint() {
    if (!this.props.hint) {
      return null;
    }

    return (
      <p className={styles.hint}>
        <FormattedMessage id={this.props.hint} />
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
        {this.renderLabel()}
        <textarea
          id={this.props.id}
          className={styles.input}
          value={this.props.value}
          disabled={this.props.disabled}
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

export default Textarea;
