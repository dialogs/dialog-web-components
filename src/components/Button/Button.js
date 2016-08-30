import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ButtonSpinner from './ButtonSpinner';
import styles from './Button.css';

class Button extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool.isRequired,
    wide: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['submit', 'reset', 'button', 'menu']).isRequired,
    theme: PropTypes.oneOf(['primary', 'link']).isRequired,
    size: PropTypes.oneOf(['small', 'normal', 'large']).isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'button',
    theme: 'primary',
    size: 'normal',
    wide: false,
    loading: false,
    disabled: false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.loading !== this.props.loading ||
           nextProps.disabled !== this.props.disabled ||
           nextProps.type !== this.props.type ||
           nextProps.size !== this.props.size ||
           nextProps.theme !== this.props.theme ||
           nextProps.wide !== this.props.wide ||
           nextProps.className !== this.props.className ||
           nextProps.id !== this.props.id ||
           nextProps.name !== this.props.name;
  }

  renderLoading() {
    if (!this.props.loading) {
      return null;
    }

    return (
      <ButtonSpinner />
    );
  }

  render() {
    const className = classNames(
      styles.button,
      styles[this.props.theme],
      styles[this.props.size],
      { [styles.wide]: this.props.wide },
      this.props.className
    );

    return (
      <button
        id={this.props.id}
        name={this.props.name}
        className={className}
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
        {this.renderLoading()}
      </button>
    );
  }
}

export default Button;
